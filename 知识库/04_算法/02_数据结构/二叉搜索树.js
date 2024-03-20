var BinarySearchTree = /** @class */ (function () {
    function BinarySearchTree(_compare) {
        if (_compare === void 0) { _compare = (function (a, b) { return a - b; }); }
        this._compare = _compare;
        this.root = null;
        /**
         * 不重复数字的个数
         */
        this.length = 0;
        this.min = null;
        this.max = null;
        this.minCache = true;
        this.maxCache = true;
        this.compare = this.compare.bind(this);
    }
    BinarySearchTree.prototype.isT = function (t) {
        return t !== undefined && t !== null;
    };
    BinarySearchTree.prototype.compare = function (a, b) {
        var isT = this.isT;
        if (isT(a) && isT(b))
            return this._compare(a, b);
        if (isT(a))
            return 1;
        if (isT(b))
            return -1;
        return 0;
    };
    /** 判断是否为空
     */
    BinarySearchTree.prototype.isEmpty = function () {
        return !this.root;
    };
    /** 获取所有元素个数,统计的是包含所有重复数字的数量
     */
    BinarySearchTree.prototype.size = function () {
        return this.root ? this.root.size : 0;
    };
    /** 返回树的 root 元素
     */
    BinarySearchTree.prototype.getRoot = function () {
        return this.root;
    };
    /** # 返回最小值
     *  如果之前发生删除,并且删除的数等于最小值,则会在下次获取最小值时,重新查找最小值,并缓存最小值
     *  否则直接返回缓存中的最小值
     */
    BinarySearchTree.prototype.getMin = function () {
        if (this.minCache) {
            return this.min;
        }
        var min = this.searchKth(this.size());
        this.min = min;
        this.minCache = true;
        return min;
    };
    /** # 返回最大值
     *  如果之前发生删除,并且删除的数等于最大值,则会在下次获取最大值时,重新查找最大值,并缓存最大值
     *  否则直接返回缓存中的最大值
     */
    BinarySearchTree.prototype.getMax = function () {
        if (this.maxCache) {
            return this.max;
        }
        var max = this.searchKth(1);
        this.max = max;
        this.maxCache = true;
        return max;
    };
    //#region balance
    /**
     * 平衡操作
     * @param node 失衡的根结点
     * @returns 返回平衡之后的根结点
     */
    BinarySearchTree.prototype.balance = function (node) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        node.height = this.getHeight(node);
        var blance = this.getBalance(node);
        // node.height = Math.max(leftH, rightH) + 1
        var res;
        // 平衡
        if (Math.abs(blance) === 2) {
            if (blance > 0) {
                var heightDif = ((_c = (_b = (_a = node.left) === null || _a === void 0 ? void 0 : _a.left) === null || _b === void 0 ? void 0 : _b.height) !== null && _c !== void 0 ? _c : 0) - ((_f = (_e = (_d = node.left) === null || _d === void 0 ? void 0 : _d.right) === null || _e === void 0 ? void 0 : _e.height) !== null && _f !== void 0 ? _f : 0);
                if (heightDif > 0) {
                    // 左左
                    res = this.rotateRight(node);
                }
                else if (heightDif < 0) {
                    // 左右
                    res = this.rotateLeftRight(node);
                }
            }
            else {
                var heightDif = ((_j = (_h = (_g = node.right) === null || _g === void 0 ? void 0 : _g.left) === null || _h === void 0 ? void 0 : _h.height) !== null && _j !== void 0 ? _j : 0) - ((_m = (_l = (_k = node.right) === null || _k === void 0 ? void 0 : _k.right) === null || _l === void 0 ? void 0 : _l.height) !== null && _m !== void 0 ? _m : 0);
                if (heightDif > 0) {
                    // 右左
                    res = this.rotateRightLeft(node);
                }
                else if (heightDif < 0) {
                    // 右右
                    res = this.rotateLeft(node);
                }
            }
        }
        return res ? res : node;
    };
    BinarySearchTree.prototype.rotateRight = function (node) {
        var left = node.left;
        var leftRight = left.right;
        left.right = node;
        node.left = leftRight;
        node.height = this.getHeight(node);
        left.height = this.getHeight(left);
        node.size = this.getSize(node);
        left.size = this.getSize(left);
        return left;
    };
    BinarySearchTree.prototype.rotateLeft = function (node) {
        var right = node.right;
        var rightLeft = right.left;
        right.left = node;
        node.right = rightLeft;
        node.height = this.getHeight(node);
        right.height = this.getHeight(right);
        node.size = this.getSize(node);
        right.size = this.getSize(right);
        return right;
    };
    BinarySearchTree.prototype.rotateLeftRight = function (node) {
        node.left = this.rotateLeft(node.left);
        return this.rotateRight(node);
    };
    BinarySearchTree.prototype.rotateRightLeft = function (node) {
        node.right = this.rotateRight(node.right);
        return this.rotateLeft(node);
    };
    //#endregion
    BinarySearchTree.prototype.getBalance = function (node) {
        return this.getHeight(node.left) - this.getHeight(node.right);
    };
    BinarySearchTree.prototype.getHeight = function (node) {
        var _a, _b, _c, _d;
        if (!node)
            return 0;
        return Math.max((_b = (_a = node.left) === null || _a === void 0 ? void 0 : _a.height) !== null && _b !== void 0 ? _b : 0, (_d = (_c = node.right) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : 0) + 1;
    };
    BinarySearchTree.prototype.getSize = function (node) {
        var _a, _b, _c, _d;
        if (!node)
            return 0;
        return ((_b = (_a = node.left) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = node.right) === null || _c === void 0 ? void 0 : _c.size) !== null && _d !== void 0 ? _d : 0) + node.count;
    };
    BinarySearchTree.prototype.createNode = function (val) {
        return { id: Math.random() * new Date().valueOf(), val: val, left: null, right: null, size: 1, height: 1, count: 1 };
    };
    /** 插入元素
     */
    BinarySearchTree.prototype.insert = function (val) {
        var _a;
        var cur = this.createNode(val);
        if (this.isEmpty()) {
            this.root = cur;
            this.length++;
        }
        else {
            ;
            _a = this.insertNode(this.root, cur), cur = _a[1];
        }
        if (this.min === null || this.compare(this.min, val) > 0) {
            this.min = val;
        }
        if (this.max === null || this.compare(this.max, val) < 0) {
            this.max = val;
        }
    };
    /**
     *
     * @param node 当前遍历的结点
     * @param cur 需要插入的结点
     * @param parent 当前结点的父节点
     * @returns 返回包含一个 boolean 值,用来标记是否需要重平衡,以及插入的 Node,如果是重复值,则返回已经存在的那个 Node
     */
    BinarySearchTree.prototype.insertNode = function (node, cur, parent) {
        if (parent === void 0) { parent = null; }
        node.size++;
        var compareResult = this.compare(cur.val, node.val);
        var res;
        if (compareResult === 0) {
            // 要插入的结点比当前结点相等,既元素已存在,只需更新 count
            node.count++;
            // 只是增加计数,不会对平衡性造成影响,所以不需要重新平衡
            return [false, node];
        }
        else if (compareResult > 0) {
            // 要插入的结点比当前结点大,则需要插入到右子树中
            if (node.right) {
                res = this.insertNode(node.right, cur, node);
                if (!res[0])
                    return res;
            }
            else {
                node.right = cur;
                this.length++;
                res = [true, cur];
            }
        }
        else {
            // 要插入的结点比当前结点小,则需要插入到左子树中
            if (node.left) {
                res = this.insertNode(node.left, cur, node);
                if (!res[0])
                    return res;
            }
            else {
                node.left = cur;
                this.length++;
                res = [true, cur];
            }
        }
        // 平衡操作
        // 优化: 使用 res[0] 标志判断是否需要进行平衡
        // 对于新添加的结点,总是需要进行平衡
        // 如果发现某个子树平衡前后的没有变化,树的高度也没有变化,则后续祖先结点不需要进行平衡操作
        var preHeight = node.height;
        var newNode = this.balance(node);
        if (newNode === node && node.height === preHeight) {
            // 当前根结点以及树高度没有发生变化,则后续不需要进行平衡
            res = [false, res[1]];
        }
        else if (newNode !== node) {
            // 当前元素发生变化,对于插入来说,只会调整一次,后续不需要变化
            if (parent) {
                parent.left === node ? (parent.left = newNode) : (parent.right = newNode);
            }
            else {
                this.root = newNode;
            }
            res = [false, res[1]];
        }
        return res;
    };
    /** 删除元素
     */
    BinarySearchTree.prototype.delete = function (val) {
        if (!this.root)
            return;
        this.deleteNode(val, this.root, null);
    };
    BinarySearchTree.prototype.deleteNode = function (val, node, parent) {
        var _a, _b;
        if (!node)
            return null;
        var res = this.compare(val, node.val);
        if (res === 0) {
            // 找到要删除的元素
            node.count--;
            node.size--;
            // 存在多个当前元素,所以只是减去计数,并不需要改变结构
            if (node.count > 0)
                return node;
            if (!node.left || !node.right) {
                if (this.min === val) {
                    this.minCache = false;
                }
                if (this.max === val) {
                    this.maxCache = false;
                }
                this.length--;
                // 只有一个子结点或者没有子结点,则直接返回子结点即可
                if (!parent) {
                    this.root = (_a = node.left) !== null && _a !== void 0 ? _a : node.right;
                    return this.root;
                }
                else {
                    return (_b = node.left) !== null && _b !== void 0 ? _b : node.right;
                }
            }
            else {
                // 同时存在左右结点,则需要找到一个值放到当前位置,然后删除那个值
                // 这个值可以是比当前值大的最小值,也可以是比当前值小的最大值
                // 这里根据左右子树的高度进行选择
                var selectLeft = node.left.height > node.right.height;
                var replaceNode = selectLeft ? this.pre(node) : this.next(node), name_1 = selectLeft ? 'left' : 'right';
                node.val = replaceNode.val;
                node.count = replaceNode.count;
                replaceNode.count = 0;
                node[name_1] = this.deleteNode(replaceNode.val, node[name_1], node);
            }
        }
        else if (res > 0) {
            node.right = this.deleteNode(val, node.right, node);
        }
        else {
            node.left = this.deleteNode(val, node.left, node);
        }
        // 重新计算 size
        node.size = this.getSize(node);
        var preHeight = node.height;
        var newNode = this.balance(node);
        if (parent) {
            parent.left === node ? (parent.left = newNode) : (parent.right = newNode);
        }
        else {
            this.root = newNode;
        }
        return newNode;
    };
    // 删除操作时,获取替代当前结点的结点
    BinarySearchTree.prototype.next = function (node) {
        var next = node.right;
        while (next === null || next === void 0 ? void 0 : next.left) {
            next = next.left;
        }
        return next;
    };
    BinarySearchTree.prototype.pre = function (node) {
        var pre = node.left;
        while (pre === null || pre === void 0 ? void 0 : pre.right) {
            pre = pre.right;
        }
        return pre;
    };
    /** 查找第一个大于等于 val 的值
     *
     */
    BinarySearchTree.prototype.search = function (val, compare) {
        if (this.isEmpty()) {
            return null;
        }
        var _a = this.searchCeilingNode(this.root, val, compare !== null && compare !== void 0 ? compare : this.compare), node = _a[1];
        return node.val;
    };
    BinarySearchTree.prototype.searchCeilingNode = function (node, val, compare, parent) {
        if (parent === void 0) { parent = null; }
        var res = compare(val, node.val);
        if (res === 0) {
            return [parent, node];
        }
        else if (res > 0) {
            if (node.right) {
                return this.searchCeilingNode(node.right, val, compare, node);
            }
            else {
                return [parent, node];
            }
        }
        else {
            if (node.left) {
                var _a = this.searchCeilingNode(node.left, val, compare, node), p = _a[0], value = _a[1];
                if (compare(value.val, val) < 0) {
                    return [parent, node];
                }
                else {
                    return [p, value];
                }
            }
            else {
                return [parent, node];
            }
        }
    };
    /** 获取大于等于 val 的最小值
     *
     */
    BinarySearchTree.prototype.ceiling = function (val) {
        if (this.isEmpty()) {
            return null;
        }
        var _a = this.searchCeilingNode(this.root, val, this.compare), node = _a[1];
        return this.compare(node.val, val) >= 0 ? node.val : null;
    };
    BinarySearchTree.prototype.searchFloorNode = function (node, val, compare, parent) {
        if (parent === void 0) { parent = null; }
        var res = compare(val, node.val);
        if (res === 0) {
            return [parent, node];
        }
        else if (res > 0) {
            if (node.right) {
                var _a = this.searchFloorNode(node.right, val, compare, node), p = _a[0], value = _a[1];
                if (compare(value.val, val) > 0) {
                    return [parent, node];
                }
                else {
                    return [p, value];
                }
            }
            else {
                return [parent, node];
            }
        }
        else {
            if (node.left) {
                return this.searchFloorNode(node.left, val, compare, node);
            }
            else {
                return [parent, node];
            }
        }
    };
    /** 获取小于等于 val 的最大值
     *
     */
    BinarySearchTree.prototype.floor = function (val) {
        if (this.isEmpty()) {
            return null;
        }
        var _a = this.searchFloorNode(this.root, val, this.compare), node = _a[1];
        return this.compare(node.val, val) <= 0 ? node.val : null;
    };
    /** 获取第 k 个元素的值,k 从 1 开始,如果 k 超出边界,返回 null
     *
     */
    BinarySearchTree.prototype.searchKth = function (k) {
        if (this.isEmpty()) {
            return null;
        }
        if (k <= 0 || k > this.size()) {
            return null;
        }
        var node = this.searchNodeKth(this.root, k);
        return node.val;
    };
    BinarySearchTree.prototype.searchNodeKth = function (node, k) {
        var _a, _b, _c, _d;
        var rSize = (_b = (_a = node.right) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0;
        if (rSize === k - 1 || (rSize < k && rSize + node.count >= k))
            return node;
        if (node.right && rSize > k - 1)
            return this.searchNodeKth(node.right, k);
        else
            return this.searchNodeKth(node.left, k - ((_d = (_c = node.right) === null || _c === void 0 ? void 0 : _c.size) !== null && _d !== void 0 ? _d : 0) - node.count);
    };
    /** 统计大于等于 val 的个数
     *
     * @param val 需要统计的值
     */
    BinarySearchTree.prototype.countGreaterThanEq = function (val) {
        var _this = this;
        if (!this.root)
            return 0;
        return this.countCompare(val, function (a, b) { return _this._compare(a, b); }, this.root);
    };
    BinarySearchTree.prototype.countCompare = function (val, compare, node, pre) {
        var _a, _b, _c, _d;
        if (pre === void 0) { pre = 0; }
        var res = compare(val, node.val);
        if (res === 0) {
            return pre + ((_b = (_a = node.right) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0) + node.count;
        }
        else if (res > 0) {
            if (node.right) {
                return this.countCompare(val, compare, node.right, pre);
            }
            else {
                return pre;
            }
        }
        else {
            var count = pre + ((_d = (_c = node.right) === null || _c === void 0 ? void 0 : _c.size) !== null && _d !== void 0 ? _d : 0) + node.count;
            if (node.left) {
                return this.countCompare(val, compare, node.left, count);
            }
            else {
                return count;
            }
        }
    };
    BinarySearchTree.prototype.toArray = function () {
        if (!this.root)
            return [];
        var res = [];
        var dfs = function (node) {
            if (node.left)
                dfs(node.left);
            res.push(node.val);
            if (node.right)
                dfs(node.right);
        };
        dfs(this.root);
        return res;
    };
    return BinarySearchTree;
}());



// nihao
// ?这个东西是什么来着
// TODO：refaca
// !nihaoanijdainia