(function (win) {
    const l = 82, //滑块边长
        r = 15, //滑块半径
        w = 800, //canvas宽度
        h = 500, //canvas高度
        PI = Math.PI;
    const ll = l + r * 2; //滑块的实际边长

    // 获取指定区间内的随机数
    function getRandomNumberByRange(start, end) {
        return Math.round(Math.random() * (end - start) + start);
    }

    // 创建元素
    function createElement(tagName) {
        return document.createElement(tagName);
    }

    // 创建画布
    function createCanvas(width, height) {
        const canvas = createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    // 获取随机图片
    function getRandomImg() {
        // 这个网站可以生成随机图片
        return 'https://picsum.photos/300/150/?image=' + getRandomNumberByRange(0, 100);
    }

    // 创建图片
    function createImg(onload) {
        const img = createElement('img');
        img.crossOrigin = 'Anonymous';
        img.onload = onload;
        img.onerror = () => {
            img.src = getRandomImg();
        }
        img.src = getRandomImg();
        return img;
    }

    // 添加样式
    function addClass(tag, className) {
        tag.classList.add(className);
    }
    // 移除样式
    function removeClass(tag, className) {
        tag.classList.remove(className);
    }

    // 绘制
    function draw(ctx, operation, x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + l / 2, y);
        ctx.arc(x + l / 2, y - r + 2, r, 0, 2 * PI);
        ctx.lineTo(x + l / 2, y);
        ctx.lineTo(x + l, y);
        ctx.lineTo(x + l, y + l / 2);
        ctx.arc(x + l + r - 2, y + l / 2, r, 0, 2 * PI);
        ctx.lineTo(x + l, y + l / 2);
        ctx.lineTo(x + l, y + l);
        ctx.lineTo(x, y + l);
        ctx.lineTo(x, y);
        ctx.fillStyle = '#fff';
        ctx[operation]();
        ctx.beginPath();
        ctx.arc(x, y + l / 2, r, 1.5 * PI, 0.5 * PI);
        ctx.globalCompositeOperation = 'xor';
        ctx.fill();
    }

    // 求和
    function sum(x, y) {
        return x + y;
    }
    // 求平方
    function square(x) {
        return x * x;
    }

    // 验证码类
    class captcha {
        // 构造器
        constructor(el, success, fail) {
            this.el = el;
            this.success = success;
            this.fail = fail;
        }

        // 初始化
        init() {
            this.initDOM();
            this.initImg();
            this.draw();
            this.bindEvents();
        }

        // 初始化DOM
        initDOM() {
            const canvas = createCanvas(w, h),
                block = canvas.cloneNode(true),
                sliderContainer = createElement('div'),
                sliderMask = createElement('div'),
                slider = createElement('div'),
                refreshIcon = createElement('div'),
                sliderIcon = createElement('span'),
                text = createElement('span');
            block.className = 'block';
            sliderContainer.className = 'slider-container';
            sliderMask.className = 'slider-mask';
            slider.className = 'slider';
            refreshIcon.className = 'refresh-icon';
            sliderIcon.className = 'slider-icon';
            text.className = 'slider-text';
            text.innerHTML = '向右滑动滑块填充拼图';

            const el = this.el;
            el.appendChild(canvas);
            el.appendChild(refreshIcon);
            el.appendChild(block);
            slider.appendChild(sliderIcon);
            sliderMask.appendChild(slider);
            sliderContainer.appendChild(sliderMask);
            sliderContainer.appendChild(text);
            el.appendChild(sliderContainer);

            Object.assign(this, {
                canvas,
                block,
                sliderContainer,
                refreshIcon,
                slider,
                sliderMask,
                sliderIcon,
                text,
                canvasCtx: canvas.getContext('2d'),
                blockCtx: block.getContext('2d')
            });
        }

        // 初始化图像
        initImg() {
            const img = createImg(() => {
                this.canvasCtx.drawImage(img, 0, 0, w, h);
                this.blockCtx.drawImage(img, 0, 0, w, h);
                const y = this.y - r * 2 + 2;
                const imageData = this.blockCtx.getImageData(this.x, y, ll, ll);
                this.block.width = ll;
                this.blockCtx.putImageData(imageData, 0, y);
            });
            this.img = img;
        }

        // 绘画
        draw() {
            this.x = getRandomNumberByRange(ll + 10, w - (ll + 10));
            this.y = getRandomNumberByRange(10 + r * 2, h - (ll + 10));
            draw(this.canvasCtx, 'fill', this.x, this.y);
            draw(this.blockCtx, 'clip', this.x, this.y);
        }

        // 清除
        clean() {
            this.canvasCtx.clearRect(0, 0, w, h);
            this.blockCtx.clearRect(0, 0, w, h);
            this.block.width = w;
        }

        // 绑定事件
        bindEvents() {
            this.el.onselectstart = () => false;
            this.refreshIcon.onclick = () => {
                this.reset();
            }

            let originX, originY, trail = [], isMouseDown = false;
            this.slider.addEventListener('mousedown', function (e) {
                originX = e.x;
                originY = e.y;
                isMouseDown = true;
            })
            document.addEventListener('mousemove', (e) => {
                if (!isMouseDown) {
                    return false;
                }
                const moveX = e.x - originX;
                const moveY = e.y - originY;
                if (moveX < 0 || moveX + 38 >= w) {
                    return false;
                }
                this.slider.style.left = moveX + 'px';
                var blockLeft = (w - 40 - 20) / (w - 40) * moveX;
                this.block.style.left = blockLeft + 'px';

                addClass(this.sliderContainer, 'slider-container-active');
                this.sliderMask.style.width = moveX + 'px';
                trail.push(moveY);
            })
            document.addEventListener('mouseup', (e) => {
                if (!isMouseDown) {
                    return false;
                }
                isMouseDown = false;
                if (e.x == originX) {
                    return false;
                }
                removeClass(this.sliderContainer, 'slider-container-active');
                this.trail = trail;
                const spliced = this.verify();
                if (spliced) {
                    addClass(this.sliderContainer, 'slider-container-success');
                    this.success && this.success();
                } else {
                    addClass(this.sliderContainer, 'slider-container-fail');
                    this.fail && this.fail();
                    setTimeout(() => {
                        this.reset();
                    }, 1000);
                }
            })
        }

        // 重置
        reset() {
            this.sliderContainer.className = 'slider-container';
            this.slider.style.left = 0;
            this.block.style.left = 0;
            this.sliderMask.style.width = 0;
            this.clean();
            this.img.src = getRandomImg();
            this.draw();
        }
        // 验证
        verify() {
            const left = parseInt(this.block.style.left);
            return Math.abs(left - this.x) < 10; //10表示容错率，值越小，需要拼得越精确
        }
    }

    win.captcha = {
        init: function (element, success, fail) {
            new captcha(element, success, fail).init();
        }
    }
}(window))