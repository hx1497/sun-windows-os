<template>
    <div class="cal_wrap">
        <!-- 计算器屏幕 -->
        <div class="screen">
            <p class="process" >
                {{message}}
            </p>
            <p class="result">
                {{result}}
            </p>
        </div>

        <!-- 计算器按钮 -->
        <div class="op_space">
            <ul class="keyboard">
                <li class="symbol border" >(</li>
                <li class="symbol border" >)</li>
                <li class="symbol border" >%</li>
                <li class="right border" @click="clear()">C</li>
                <li @click="addNum('7')">7</li>
                <li @click="addNum('8')">8</li>
                <li @click="addNum('9')">9</li>
                <li class="right symbol border" @click="addOps('/')">/</li>
                <li @click="addNum('4')">4</li>
                <li @click="addNum('5')">5</li>
                <li @click="addNum('6')">6</li>
                <li class="right symbol border" @click="addOps('*')">*</li>
                <li @click="addNum('1')">1</li>
                <li @click="addNum('2')">2</li>
                <li @click="addNum('3')">3</li>
                <li class="right symbol border" @click="addOps('-')">-</li>
                <li @click="addNum('0')">0</li>
                <li class="symbol" >.</li>
                <li class="symbol" @click="calculate();addEqual()">=</li>
                <li class="right symbol border" @click="addOps('+')">+</li>
            </ul> 
        </div>
    </div>
</template>

<script>
export default {
        data() {
            
            return {
                result:'',
                message:'',
                nums:[],
                opStr:'+-*/'
                }
        },
        methods: {
            addNum(text){
                if(this.message.includes('=')){
                    this.message = '';
                    this.result = '';
                    }
                    this.message = this.message+text
                    
                    return this.message;
            },
            addOps(text){
                
                if(!this.opStr.includes(this.message.charAt(this.message.length - 1))){
                    this.message = this.message + text
                    return this.message
                }
            },

            clear(){
                this.message = '';
                this.result = ''
                
            },

            addEqual(){
                this.message+='='
            },

            calculate(){
            let num = 0;
            let preSign = '+';
            const n = this.message.length;
            for(let i=0; i<n; ++i){

                if(!isNaN(Number(this.message[i]))){//先确定message[i]是数字
                    num = num*10 + (+this.message[i]);
                   
                }
                if(isNaN(Number(this.message[i])) || i === n-1){
                  
                    switch(preSign){
                        case '+':
                            this.nums.push(num);
                            break;
                        case '-':
                            this.nums.push(-num);                                
                            break;
                        case '*':
                            this.nums.push(this.nums.pop() * num);
                            break;
                        case '/':
                            this.nums.push(this.nums.pop() / num);
                    }
                    num = 0;//每次循环末尾记得将num初始化为0
                    preSign = this.message[i];
                }
            }
            console.log(this.nums)
                /* 循环结束，开始最终加算 */
            let res = 0;
            while(this.nums.length){
                res += this.nums.pop()
            }

            console.log(res)
            this.result = res;
            return this.result;
        },
    }
}
</script>

<style  scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .cal_wrap{
        width: 538px;
        height: 265px;
        padding: 10px;
        border-color: #333333;
        box-shadow:#000000 0px 0px 3px 0px ;
        color: #333333;
    }
    .cal_wrap .screen {
        width: 518px;
        height: 55px;
        padding: 0 10px;
        background-color: #F8F8FF;
        color: #333333;
        text-align: right;
        font-family: Arial, Helvetica, sans-serif;
    }
    
    .screen .process {
        height: 22px;
        color: #A9A9A9;
        font-size: 15px;
        line-height: 22px;
    }
    .screen .result {
        height: 33px;
        font-size: 24px;
        line-height: 33px;
    }
    .op_space{
        width: 538px;
        height: 205px;
    }
    .op_space .keyboard {
        width: 100%;
        height: 100%;
        list-style: none;
    }
    .keyboard li {
        display: inline-block;
        width: 24.863%;
        height: 20%;
        text-align: center;
        line-height: 38px;
        background-color: #ffffff;
         color: #333333;
        border-color: #ebebeb;
        border-style: solid solid none none;
        border-width: 1px 1px 0 0;
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
    }
    .keyboard li:hover{
        cursor: pointer;
    }
    .keyboard li:active{
        background-color: #d3d3d3;
    }
    .keyboard .right {
        border-right-width: 0;
    }
    .keyboard .border{
        background-color: #f9f9f9;
    }
    .keyboard .symbol {
        color: #ff6600;
    }
</style>