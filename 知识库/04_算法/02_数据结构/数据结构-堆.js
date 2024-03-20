class Heap {
    constructor(compare) {
        this.compare = compare;
        this.arr = [];
    }
    // 查看大小
    size() {
        return this.arr.length;
    }
    // 查看最值
    peek() {
        return this.arr[0];
    }
    // 插入
    add(val) {
        let arr = this.arr;
        let compare = this.compare;
        arr.push(val);
        let index = arr.length - 1;
        while (index !== 0) {
            let p = Math.floor((index - 1) / 2);
            if (compare(arr[p], arr[index]) > 0) {
                [arr[p], arr[index]] = [arr[index], arr[p]];
                index = p;
            } else {
                break;
            }
        }  
    }
    // 取出最值
    poll() {
        let arr = this.arr;
        let compare = this.compare;
        [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1],arr[0]];
        let temp = arr.pop();
        let index = 0;
        while (2 * index + 1 < arr.length) {
            let small = arr[2 * index + 1];
            let smallIndex = 2 * index + 1;
            if (2 * index + 2 < arr.length) {
                if (compare(arr[2 * index + 2], arr[smallIndex]) < 0) {
                    small = arr[2 * index + 2];
                    smallIndex = 2 * index + 2;
                }
            }
            if (compare(arr[index], arr[smallIndex]) > 0) {
                [arr[smallIndex], arr[index]] = [arr[index], arr[smallIndex]];
                index = smallIndex;
            } else {
                break;
            }
        }
        return temp;
    }
    //删除指定索引
    remove(index) {
        let arr = this.arr;
        let compare = this.compare;
    
        if (index < 0 || index >= arr.length) {
            throw new Error("Index out of bounds");
        }
    
        [arr[index], arr[arr.length - 1]] = [arr[arr.length - 1], arr[index]];
        const removedElement = arr.pop(); 
    
        let parent = Math.floor((index - 1) / 2);
        if (parent >= 0 && compare(arr[parent], arr[index]) > 0) {
            while (index !== 0 && compare(arr[parent], arr[index]) > 0) {
                [arr[parent], arr[index]] = [arr[index], arr[parent]];
                index = parent;
                parent = Math.floor((index - 1) / 2);
            }
        } else {
            while (2 * index + 1 < arr.length) {
                let smallIndex = 2 * index + 1;
                if (2 * index + 2 < arr.length && compare(arr[2 * index + 2], arr[smallIndex]) < 0) {
                    smallIndex = 2 * index + 2;
                }
                if (compare(arr[index], arr[smallIndex]) > 0) {
                    [arr[smallIndex], arr[index]] = [arr[index], arr[smallIndex]];
                    index = smallIndex;
                } else {
                    break;
                }
            }
        }
    
        return removedElement;
    }
}

function test(){

}
