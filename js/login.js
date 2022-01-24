// ESM 方式載入
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.28/vue.esm-browser.min.js';

const url = 'https://vue3-course-api.hexschool.io/v2';

// app => Vue 實體
const app = createApp({
    data() {
        // function return
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            // 發送 API 至遠端並登入、儲存 Token
            axios.post(`${url}/admin/signin`, this.user)
            .then(res => {
                console.log(res.data);
                // 解構方式取出
                const { token, expired } = res.data;
                //console.log(token, expired);
                //（參考）https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
                // 儲存 cookie token
                // expires 設置有效時間
                document.cookie = `hexToken=${token}; expires=${new Date(expired)};`; 
                window.location = 'products.html'; // 跳轉頁面
            })
            .catch(error => {
                //console.log(error.data.message);
                alert('您輸入錯誤，請重新輸入！');
                
            })
        }
    },
}).mount('#app');