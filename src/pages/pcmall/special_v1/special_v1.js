// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import Vue from 'vue'
import Vuex from 'vuex'
import App from './special_v1.vue'

import '@/assets/css/middleware.scss';
import '@/ui-lib/output'

Vue.use(Vuex)

Vue.config.productionTip = false

let today = new Date().format('yyyy年MM月dd日');

/**
 * 关于这个新专题模板的vuex部分：
 * 慢慢改，现在只有special__product-list--select里面拥有vuex的内容，而且比较多，先不动。
 * 其他组件已经转为从props传数据了，从vuex剥离
 */

import {getSku} from '@/assets/js/xhr/service' 

const store = new Vuex.Store({
  state: {
    productList: [
      // {
      //   file: 'https://sslresources.linghit.com/shopv2_1466155094.jpg',
      //   alt: '灵机独家设计开运六合转运珠银男女鸡年旺运送项链手链鸡年年链...',
      //   price: '258.00',
      //   oldPrice: '258.00',
      //   people: '2000人购买',
      //   selected: false,
      //   count: 1,
      //   selectedStyle: '',        
      //   styles: [
      //     {
      //       t: '生肖鼠女',
      //       selected: true
      //     },
      //     {
      //       t: '生肖我鼠女',
      //     },
      //     {
      //       t: '生肖鼠问问女',
      //     },
      //     {
      //       t: '生肖鼠女问问我我',
      //     },
      //     {
      //       t: '生肖',
      //     },
      //     {
      //       t: '生鼠女',
      //     },
      //     {
      //       t: '生肖鼠女',
      //     },
      //   ],
      // },
    ],


    // noteList: [
    //   {
    //     name: '周公山',
    //     sex: '女',
    //     age: '28',
    //     content: '测2017年的感情运说下半年有正桃花，果然这个月就遇到现在的男朋友了，真的好开心！还挺准的，哈哈！'
    //   },
    // ],
    noteList: [
      {name:"蒋蔚",mobile:"186******89",address:"广西壮族自治区",status: '已发货',time: today},
      {name:"胡春梅",mobile:"137******25",address:"贵州省凯里市",status: '已发货',time: today},
      {name:"孙宝",mobile:"135******13",address:"陕西省西安市",status: '已发货',time: today},
      {name:"马瑾",mobile:"159******20",address:"上海市杨浦区",status: '已发货',time: today},
      {name:"李国平",mobile:"159******61",address:"上海南桥",status: '已发货',time: today},
      {name:"武锡俊",mobile:"189******91",address:"新疆阿克苏市",status: '已发货',time: today},
      {name:"李昱达",mobile:"186******97",address:"北京市海淀区",status: '已发货',time: today},
      {name:"冯汉江",mobile:"187******32",address:"浙江省杭州市",status: '已发货',time: today},
      {name:"周光",mobile:"137******24",address:"广东中山市",status: '已发货',time: today},
      {name:"徐蕾",mobile:"187******02",address:"北京海淀区",status: '已发货',time: today},
      {name:"张清俊",mobile:"182******38",address:"山西省忻州市",status: '已发货',time: today},
      {name:"鄭裕豐",mobile:"886291***12",address:"新北市板橋區",status: '已发货',time: today},
      {name:"殷超群",mobile:"136******91",address:"海南省海口市",status: '已发货',time: today},
      {name:"胡开会",mobile:"139******12",address:"陕西咸阳市",status: '已发货',time: today},
      {name:"庞厚深",mobile:"136******76",address:"广东省东莞市",status: '已发货',time: today},
      {name:"唐继长",mobile:"152******11",address:"湖南省衡阳市",status: '已发货',time: today},
      {name:"成金灿",mobile:"131******33",address:"广东省清远市",status: '已发货',time: today},
      {name:"朱彤",mobile:"138******21",address:"四川省成都市",status: '已发货',time: today},
      {name:"黄柏凯",mobile:"189******35",address:"四川省成都市",status: '已发货',time: today},
      {name:"左全军",mobile:"150******68",address:"河南省南阳市",status: '已发货',time: today},
      {name:"赖薇",mobile:"189******35",address:"四川省成都市",status: '已发货',time: today},
      {name:"孙兴元",mobile:"135******66",address:"云南省楚雄州",status: '已发货',time: today},
      {name:"刘建萍",mobile:"137******86",address:"广东省清远市",status: '已发货',time: today},
      {name:"冯立明",mobile:"151******86",address:"山东省临沂市}",status: '已发货',time: today},
    ],
    caseList: [],

    showProList: false,
    selectedAll: false,
    showSkuList: false,
    openItem: {},
    totalPrice: 0,
    seo: {},
    case: {},
    payUrl: '123123123',
  },

  mutations: {
    toggleProList(state, show) {
      state.showProList = show;
    },

    getTotalPrice(state) {
      let price = 0;
      let list = state.productList;
      price = list.reduce((price, item) => {
        item.selected && (price = price + (Number(item.price) || 0) * (item.count|| 1));
        return price;
      }, price)
      console.log(price)
      state.totalPrice = price;
    },

    setSpecialSeo(state, data = {}) {
      state.seo = data;
    },

    setSpecialProductList(state, data = {}) {
      state.productList = data;
    },

    setSpecialCase(state, data = {}) {
      // state.case = data;
      state.caseList = data;
    },

    // setOpenItem(state, data = {}) {
    //   state.openItem = data;
    // }
  },

  actions: {
    toggleSelected({state, commit}, {targetPro, selected}) {
      if (!targetPro) {
        state.selectedAll = !state.selectedAll;
        state.productList.every((item) => {
          item.selected = state.selectedAll;
          return true;
        })
      } else {
        targetPro.selected = selected || !targetPro.selected;
        state.selectedAll = state.productList.every((item) => item.selected);
      }
      commit('getTotalPrice');
    },
    openStyleList({state}, {item}) {
      console.log(item)
      let openItem = item || {};

      // if (!openItem.skuList) {
        getSku({id: openItem.itemId})
        .then((rsp) => {
          console.log(rsp);
          openItem.skuList = rsp && rsp.data || {};
          openItem.count = 1;
        })
      // }
      .then(() => {
        state.openItem = openItem || {};
        state.showSkuList = true;
      })

    },
    closeStyleList({state}) {
      state.showSkuList = false;
      state.openItem = {};
    },
    confirmStyle({state, commit, dispatch}) {
      state.showSkuList = false;
      dispatch('toggleSelected', {targetPro: state.openItem, selected: true})
    },
  }
})

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
