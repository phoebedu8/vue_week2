import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = createApp({
  data(){
    return{
      apiUrl: "https://vue3-course-api.hexschool.io/v2", //站點
      path: "yiijiee118", //API Path
      products: [],
      tempProduct: {}
    }
  },
  methods:{
    checkLogin(){
      axios.post(`${this.apiUrl}/api/user/check`)
      .then((res) => {
        // 驗證成功
        this.getData();
      })
      .catch((err) => {
        // 如果沒有登入就進入產品頁面，會自動跳回登入畫面
        window.location = 'login.html';
      })
    },
    getData(){
      axios.get(`${this.apiUrl}/api/${this.path}/admin/products`)
      .then(res => {
        console.log(res.data);
        this.products = res.data.products;
      })
      .catch((err)=>{
        alert(err.response.data.message);
      })
    },
    openProduct(item) {
      this.tempProduct = item;
    }
  },
  mounted() {
    // 取得 Token（僅需要設定一次）
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // 加入 header
    axios.defaults.headers.common.Authorization = token;

    this.checkLogin();
  }
})
app.mount('#app');