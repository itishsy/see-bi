<script>
// 定义一些公共的属性和方法
import moment from 'moment'
const bodyHeight = window.innerHeight - 90
const bodyContainHeight = window.innerHeight - 120
let curMonth = moment(new Date()).format('YYYYMM')
/* function commonFun () {
  console.log('公共方法')
} */
// 暴露出这些属性和方法
export default {
  bodyHeight, bodyContainHeight, curMonth
}
</script>

<style scoped>

</style>
