---
title: 自封装的组件
date: 2024-01-21
category:
  - 移动开发
---


### 录音组件

:::details 查看代码

::: tabs 
@tab useVModel
```ts
import { computed } from "vue";
export const useVModel = (props: AnyObject, propName: string, emit: (...args: any) => void) => {
  return computed({
    get() {
      return new Proxy(props, {
        set(obj, name, val) {
          emit("update:" + propName, {
            ...obj,
            [name]: val,
          });
          return true;
        },
      });
    },
    set(val) {
      emit("update:" + propName, val);
    },
  });
};

```

@tab 使用示例
```vue
<template>
    <Record v-model="showRecord" @complete="recordComplete" />
</template>

<script setup lang="ts">
//是否显示录音组件
const showRecord = ref<boolean>(false);

// 录制完成
const recordComplete = (path: string) => {
};
</script>
```

@tab 组件源码
```vue
<template>
  <tn-popup v-model="popupParam.modelValue" :overlay-closeable="false" @open="openRecordComp">
    <view class="tn-p-lg record-panel" @touchmove.prevent="() => {}">
      <view class="tn-flex-start-between">
        <text class="tn-text-2xl tn-mb">录制音频</text>
        <tn-icon name="close-circle" type="info" @click="closeRecord" :size="useVmin(50)" />
      </view>
      <view class="record-info">
        <text>
          录制状态：
          <text :style="{ color: recordingStatus.color }">{{ recordingStatus.text }}</text>
        </text>
        <text>
          最长可录制时长：
          <text>{{ recordingStatus.totalSeconds }}s</text>
        </text>
        <text>录制时长：{{ recordingStatus.recordSeconds === 0 ? "-" : recordingStatus.recordSeconds + "s" }}</text>
      </view>
      <view class="tn-flex-center-between record-controller">
        <tn-button type="primary" @tap="startRecord" :disabled="recordingStatus.status !== 0">
          <view class="tn-flex-center">
            <tn-icon name="play-fill" />
            <text>开始录音</text>
          </view>
        </tn-button>
        <tn-button type="success" @tap="recordComplate" :disabled="recordingStatus.status === 0">
          <view class="tn-flex-center">
            <tn-icon name="check" />
            <text>录音完成</text>
          </view>
        </tn-button>
      </view>
    </view>
  </tn-popup>
</template>

<script setup lang="ts">
import { reactive, inject, type Ref, nextTick } from "vue";
import type { TnModalInstance } from "@tuniao/tnui-vue3-uniapp";
import { useVmin, useVModel } from "@/utils/hooks";
import { useUserInfoStore } from "@/store";
const userInfoStore = useUserInfoStore();
const modalRef = inject<Ref<TnModalInstance>>("modalRef") as Ref<TnModalInstance>;
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
  }>(),
  {
    modelValue: false,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "complete", path: string): void;
}>();
const popupParam = useVModel(props, "modelValue", emit);
enum RecordStatus {
  "录制取消" = -1,
  "未开始",
  "录制中",
}

interface RecordingParams {
  /**
   * 录制状态
   */
  text: string;
  /**
   * 录制状态文本颜色
   */
  color: "var(--tn-color-primary)" | "var(--tn-color-success)";
  /**
   * 录制状态标识
   */
  status: -1 | 0 | 1;
  /**
   * 总共允许录制的时长
   */
  totalSeconds: number;
  /**
   * 已录制的时长
   */
  recordSeconds: number;
}

const options: RecordingParams = {
  text: "未开始",
  color: "var(--tn-color-primary)",
  status: 0,
  totalSeconds: userInfoStore.userConf.tapeDuration,
  recordSeconds: 0,
};
const recordingStatus = reactive<RecordingParams>(JSON.parse(JSON.stringify(options)));
let timer: NodeJS.Timeout;
let recorderManager: UniApp.RecorderManager | null;

/**
 * 开始录制
 */
const startRecord = () => {
  if (recordingStatus.totalSeconds === 0) {
    uni.showToast({
      icon: "none",
      title: "录音最长时间获取为0，不可进行录音！",
    });
    return;
  }
  // 录音实例只能全局创建一次，不能多次创建，会影响onStop函数里面的监听，尤其读取外面声明的变量
  recorderManager = uni.getRecorderManager?.();
  // 监听录音结束
  recorderManager?.onStop(async (file: { tempFilePath: string }) => {
    await nextTick();
    emit("update:modelValue", false);
    recordingStatus.status !== -1 && emit("complete", file.tempFilePath);
    recorderManager = null;
  });
  recorderManager?.start({
    format: "mp3",
    sampleRate: 8000, //采样率
    duration: recordingStatus.totalSeconds * 1000, //时长
  });
  countDown();
  recordingStatus.status = 1;
  recordingStatus.text = RecordStatus[recordingStatus.status];
  recordingStatus.color = "var(--tn-color-success)";
};

/**
 * 录制完成
 * @param isOvertime 是否超时
 */
const recordComplate = (isOvertime?: boolean) => {
  timer && clearInterval(timer);
  // 录制超时不用手动调用stop，超时会自动走recorderManager?.onStop
  !isOvertime && recorderManager?.stop();
};

/**
 * 关闭组件
 */
const closeRecord = () => {
  if (recordingStatus.status === 1) {
    // 如果正在录音
    modalRef.value?.showModal({
      title: "提示",
      content: "你当前有未录制完成的音频，确认关闭？",
      showCancel: true,
      cancelStyle: {
        color: "#aaa",
      },
      confirm: () => {
        recordingStatus.status = -1;
        clearInterval(timer);
        recorderManager?.stop();
        uni.showToast({
          icon: "none",
          title: "录音已取消",
        });
      },
    });
  }
};

// 计时
const countDown = () => {
  timer = setInterval(() => {
    if (recordingStatus.recordSeconds === recordingStatus.totalSeconds) {
      recordComplate(true);
      uni.hideToast();
      modalRef.value?.showModal({
        title: "提示",
        content: "录制超时，已为你自动截取允许最长录制时长的音频！",
      });
    } else {
      recordingStatus.recordSeconds++;
    }
  }, 1000);
};

/**
 * 打开组件的时候
 */
const openRecordComp = () => {
  recordingStatus.text = options.text;
  recordingStatus.color = options.color;
  recordingStatus.status = options.status;
  recordingStatus.totalSeconds = options.totalSeconds;
  recordingStatus.recordSeconds = options.recordSeconds;
};
</script>

<style lang="scss" scoped>
.record-panel {
  .record-info {
    display: flex;
    flex-direction: column;
    line-height: 90rpx;
  }
  .record-controller {
    margin-top: 50rpx;
    .tn-button {
      text {
        margin-left: 10rpx;
      }
    }
  }
}
</style>

```
:::

### 动画组件

仿vue原生Transition组件

**注意事项：需要下载animate.css库，同时注意引入的时候不能命名为Transition进行使用，会与vue原生的Transition组件冲突，而原生组件在APP中是不支持的**
:::details 查看代码
```vue
<template>
  <view
    v-show="delayShow"
    :class="[customClass, 'animate__animated', 'transition-animate', show ? (appear ? enterClass : '') : leaveClass]"
    :style="{
      ...customStyle,
      '--animate-duration': `${duration}ms`,
      '--animate-delay': `${delay}ms`,
    }"
    @click="$emit('click')">
    <slot name="default" />
  </view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
const delayShow = ref<boolean>(false);
let durationTime: number = 0;
let timer: NodeJS.Timeout;
const emit = defineEmits(["open", "opened", "close", "closed", "click"]);
const props = withDefaults(
  defineProps<{
    /**
     * 是否显示动画组件，默认值为true，可不传
     */
    show?: boolean;
    /**
     *  首次渲染时，是否显示动画效果，默认值为false，可不传
     */
    appear?: boolean;
    /**
     * 组件显示时的动画类名，默认值为：animate__fadeIn，可不传，更多动画效果参见：https://animate.style/
     */
    enterClass?: string;
    /**
     * 组件隐藏时的动画类名，默认值为：animate__fadeOut，可不传，更多动画效果参见：https://animate.style/
     */
    leaveClass?: string;
    /**
     * 组件显示或隐藏时动画持续时间，默认值为500，单位毫秒，可不传
     */
    duration?: number;
    /**
     * 组件显示或隐藏时的延迟时间，即多少秒之后组件再显示或隐藏，默认值为0，单位毫秒，可不传
     */
    delay?: number;
    /**
     * 组件的内联样式，默认值为 {}，可不传
     */
    customStyle?: object;
    /**
     * 组件的类名，默认值为 ""，可不传
     */
    customClass?: string;
  }>(),
  {
    show: true,
    appear: false,
    enterClass: "animate__fadeIn",
    leaveClass: "animate__fadeOut",
    duration: 500,
    delay: 0,
    customStyle: () => {
      return {};
    },
    customClass: "",
  }
);

const show = ref<boolean>(props.show);

watch(
  () => props.show,
  nV => {
    show.value = nV;
  }
);

watch(
  show,
  nV => {
    if (timer) clearTimeout(timer);
    if (nV) {
      delayShow.value = nV;
      emit("open");
      timer = setTimeout(
        () => {
          emit("opened");
        },
        props.enterClass ? props.duration + props.delay : 0
      );
    } else {
      emit("close");
      timer = setTimeout(
        () => {
          delayShow.value = nV;
          emit("closed");
        },
        props.leaveClass ? props.duration + props.delay : 0
      );
    }
  },
  {
    immediate: true,
  }
);

watch(
  [() => props.duration, () => props.delay],
  nV => {
    durationTime = nV[0] + nV[1];
  },
  {
    immediate: true,
  }
);

const toggleComponent = async (callback: Function): Promise<void> => {
  show.value = false;
  await nextTick();
  let _timer: NodeJS.Timeout = setTimeout(() => {
    callback();
    show.value = true;
    clearTimeout(_timer);
  }, durationTime);
};

defineExpose({
  /**
   * 暴露toggleComponent函数，通过传callback函数达到异步改变插槽内容的目的，即会等到动画结束后再改变插槽的内容
   */
  toggleComponent,
});
</script>

<style lang="scss" scoped>
.transition-animate {
  height: max-content;
}
</style>

```
:::