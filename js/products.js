// ESM 方式載入
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.28/vue.esm-browser.min.js';

createApp({
    data() {
        return {
          apiUrl: 'https://vue3-course-api.hexschool.io/v2',
          apiPath: 'xqrass-hexschool',
          products: [],
          tempProduct: {},
        }
      },
    methods: {
        checkLogin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
            .then(() => {
                this.getData();
            })
            .catch((err) => {
                window.location = 'login.html';
            })
        },
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
              .then((response) => {
                this.products = response.data.products;
              })
              .catch((err) => {
                alert(err.data.message);
              })
          },
        openProduct(item) { //查看細節
            this.tempProduct = item;
        }
    },
    //生命週期
    mounted() {
        // 取得 Token（Token 僅需要設定一次）
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // https://github.com/axios/axios (搜尋 author)
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    }
}).mount('#app');

