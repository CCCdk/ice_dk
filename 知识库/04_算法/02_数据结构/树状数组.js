class FenwickTree {
    constructor(size) {
        this.size = size;
        this.tree = new Array(size + 1).fill(0);
    }

    update(index, delta) {
        for (; index <= this.size; index += index & -index) {
            this.tree[index] = Math.max(this.tree[index], delta);
        }
    }

    query(index) {
        let maxVal = 0;
        for (; index > 0; index -= index & -index) {
            maxVal = Math.max(maxVal, this.tree[index]);
        }
        return maxVal;
    }
}

function LIS(nums) {
    const numToIndex = new Map([...new Set(nums)].sort((a, b) => a - b).map((num, index) => [num, index + 1]));
    const n = nums.length;
    const tree = new FenwickTree(numToIndex.size);
    let maxLen = 0;

    for (let i = 0; i < n; i++) {
        const index = numToIndex.get(nums[i]);
        const dpVal = tree.query(index) + 1;
        tree.update(index, dpVal);
        maxLen = Math.max(maxLen, dpVal);
    }

    return maxLen;
}

// 示例用法
const nums = [7, 7, 7, 7, 7, 7, 7];
const result = LIS(nums);
console.log(result);
