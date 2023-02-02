// 权限按钮展示指令
import { useUserStore } from '@/pinia/modules/user';
import { App } from 'vue';
export default {
  install: (app: App) => {
    const userStore = useUserStore();
    app.directive('auth', {
      // 当被绑定的元素插入到 DOM 中时……
      mounted: (el, binding) => {
        const userInfo = userStore.userInfo;
        let type = '';
        switch (Object.prototype.toString.call(binding.value)) {
          case '[object Array]':
            type = 'Array';
            break;
          case '[object String]':
            type = 'String';
            break;
          case '[object Number]':
            type = 'Number';
            break;
          default:
            type = '';
            break;
        }
        if (type === '') {
          el.parentNode.removeChild(el);
          return;
        }
        const waitUse = binding.value.toString().split(',');
        let flag = waitUse.some(
          (item: string) => item === userInfo.authorityId
        );
        if (binding.modifiers.not) {
          flag = !flag;
        }
        if (!flag) {
          el.parentNode.removeChild(el);
        }
      },
    });
  },
};