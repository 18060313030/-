import Vue from "vue"
import VueRouter from "vue-router"
import UserList from "@/components/Users/UserList.vue"
import UserDetail from "@/components/Users/UserDetail/UserDetail"
import UserList2 from "@/components/Users/UserList2.vue";
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: "/", redirect: "/userlist"},
        { path: "/userlist", component: UserList},
        { path: "/users/:id", component: UserDetail, props: true}
    ]
})

export default router