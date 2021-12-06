function throttle(fn, interval, options =
  { leading: true, trailing: false }
) {
  let { leading, trailing } = options;
  let lastTime = 0;
  let timer = null;

  function _throttle(...args) {
    const nowTime = Date.now();

    if (!lastTime && !leading) {
      lastTime = nowTime;
    }

    let remainTime = interval - (nowTime - lastTime);

    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      fn.apply(this, args);
      lastTime = nowTime;
      return;
    }

    if (trailing && !timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
        lastTime = leading ? Date.now() : 0;
      }, remainTime);
    }
  }

  _throttle.cancel = function() {
    clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };

  return _throttle;
}
