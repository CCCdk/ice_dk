function Stack() {
    this.items = [];

    Stack.prototype.push = function (element) {
        this.items.push(element);
    }

    Stack.prototype.pop = () => {
        return this.items.pop();
    }

    Stack.prototype.peek = () => {
        return this.items[this.items.length - 1]
    }

    // 4.isEmpty():判断栈是否为空
    Stack.prototype.isEmpty = () => {
        return this.items.length == 0
    }

    // 5.size():获取栈中元素的个数
    Stack.prototype.size = () => {
        return this.items.length
    }

    // 6.toString():以字符串形式输出栈内数据
    Stack.prototype.toString = () => {
        //希望输出的形式：20 10 12 8 7
        let resultString = ''
        for (let i of this.items) {
            resultString += i + ' '
        }
        return resultString
    }
}
let  s = new Stack();
let s1=new Stack();
s.push('1');
s.push('a');
s1.push('m');
s.push('b');
console.log(s.items,s1.items);	