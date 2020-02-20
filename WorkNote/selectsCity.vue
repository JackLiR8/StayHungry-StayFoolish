<template>
<!-- 地址及联选框 -->
  <div>
    <Modal
      :width="650"
      title="修改收货人信息"
      :value="true"
      @on-cancel="$emit('on-close')"
      @on-ok="submit"
      class-name="modify-consignee" >
      <v-page-loading v-if="pageLoading" />
      <Form
        v-else
        ref="infoForm"
        :model="form"
        :rules="rules"
        :labelWidth="110" >
        <FormItem label="收货人姓名：" prop="consignee" >
          <Input v-model="form.consignee" class="w-240" />
        </FormItem>
        <FormItem label="手机号码：" prop="phone" >
          <Input v-model="form.phone" class="w-240" />
        </FormItem>
        <FormItem label="邮政编码：" prop="postalCode" >
          <Input v-model="form.postalCode" class="w-240" />
        </FormItem>
        <FormItem >
          <template #label>
              <label class="required">所在区域：</label>
          </template>
          <!-- ------ 地址及联选框 ------ -->
          <Select
            v-for="sel in selects"
            :key="sel"
            v-model="form[`${sel}Code`]"
            class="address-select"
            @on-change="handleChange(sel, $event)" >
            <Option
              v-for="item in area[sel]"
              :key="item.cityCode"
              :value="item.cityCode"
            >{{item.cityName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="详细地址：" prop="address" >
          <Input type="textarea" v-model="form.address" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getCities } from '@/api/order'
export default {
  name: 'ModalModifyAddress',

  props: {
    orderInfo: Object
  },

  data() {
    const rules = {
      consignee: { required: true, message: '收货人姓名不能为空'},
      phone: { required: true, message: '手机号码不能为空' },
      postalCode: { required: true, message: '邮政编码不能为空' },
      address: { required: true, message: '详细地址不能为空' },
      // key: { required: true, message: '' },
      // key: { required: true, message: '' },
    }
    return {
      modalLoading: true,
      pageLoading: true,
      selects: ['province', 'city', 'county', 'town'],  // 用于循环四级及联选框
      form: {
        consignee: '',
        phone: '',
        postalCode: '',

        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        countyCode: '',
        countyName: '',
        townCode: '',
        townName: '',
        address: '',
      },
      rules,

      area: {
        province: [],
        city: [],
        county: [],
        town: []
      }
    }
  },

  created() {
    this.initForm();
  },

  methods: {
    initForm() {
      const { orderAddressInfo: info } = this.orderInfo;
      Object.keys(this.form).forEach(key => {
        Object.assign(this.form, { [key]: info[key] })
      })

      // 初始化地址选框
      this.initSelects();
    },
    async initSelects() {
      const { provinceCode, cityCode, countyCode } = this.form;
      // 请求四个行政等级下拉框选项
      const resList = await Promise.all([
        getCities({ parentCode: '000000' }),
        getCities({ parentCode: provinceCode }),
        getCities({ parentCode: cityCode }),
        getCities({ parentCode: countyCode })
      ]);

      if (resList.some(v => v.code !== 200)) {
        this.$utils.toast('加载所在地区出错', 'error')
      } else {
        this.sortSelect(resList);
      }

      this.pageLoading = false;
    },
    /**
     * 处理返回的地区数据，四个结果分别对应省/市/县/街道
     */
    sortSelect(resList) {
      this.selects.forEach((select, index) => {
        const { content } = resList[index].data;
        const temp = Object.seal([...content]);
        Object.assign(this.area, { [select]: temp });
      })
    },
    /**
     * 点击确认后验证表单
     */
    submit() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          this.modifyDeliverdInfo();
        } else {
          this.resetLoading();
        }
      })
    },

    async modifyDeliverdInfo() {
      this.$emit('on-close', { refresh: true });
    },
    /**
     * 某个行政等级下拉框改变时触发
     * @param {String} type - 选框等级 - province|city|county|town
     * @param {String} code - 选框返回的code
     */
    handleChange(type, code) {
      // 拦截code === undifined
      if (code === undefined) return;

      // 修改form里对应的code,name
      this.changeNameCode(type, code);

      // childs为所有子行政等级组成的数组
      // 清空子行政等级的下拉框
      // 刷新子行政等级的下拉框选项
      const childs = this.getChilds(type);
      this.clearChildren(childs);
      this.refreshOptions(childs, code);
    },
    /**
     * 选框change，改变this.form对应的name,code
     * @param {String} type - 选框等级 - province|city|county|town
     * @param {String} code - 选框返回的code
     */
    changeNameCode(type, code) {
      const data = this.area[type];
      const city = data.find(item => item.cityCode === code);
      const { cityCode, cityName } = city;
      Object.assign(this.form, { 
        [`${type}Code`]: cityCode,
        [`${type}Name`]: cityName
      })
    },
    getChilds(type) {
      const arr = this.selects;
      return arr.slice(arr.indexOf(type) + 1)
    },
    /**
     * 父行政等级变化时，清空所有子行政等级选项
     */
    clearChildren(childs) {
      for (const v of childs) {
        Object.assign(this.form, { 
          [`${v}Name`]: '',
          [`${v}Code`]: '',
        })
      }
    },
    /**
     * 父行政等级变化时，刷新子级选项，清空子级以下的选项
     */
    refreshOptions(childs, parentCode) {
      if (childs.length < 1) return;
      for (let i = 0; i < childs.length; i++) {
        const key = childs[i];
        if (i === 0) {
          this.getOptions(key, parentCode);
        } else {
          Object.assign(this.area, { [key]: [] });
        }
      }
    },
    async getOptions(key, parentCode) {
      const res = await getCities({ parentCode });
      if (res.code !== 200) {
        this.$utils.toast(res.msg, 'error');
        return
      }
      const { content } = res.data;
      Object.assign(this.area, { [key]: Object.seal(content) });
    },

    resetLoading() {
      this.modalLoading = false;
      setTimeout(() => {
        this.modalLoading = true;
      }, 0);
    }
  }
}
</script>

<style lang="less" scoped >
.modify-consignee {
  .required {
    &::before {
      content: '*';
      display: inline-block;
      margin-right: 4px;
      line-height: 1;
      font-family: SimSun;
      font-size: 14px;
      color: #ed4014;
    }
  }
  .address-select {
    display: inline-block;
    width: 120px;
    &:not(:first-child) {
      margin-left: 9px
    }
  }
  .w-240 {
    width: 240px;
  }
}
</style>
<style lang="less">
.modify-consignee {
  .ivu-modal-body {
    min-height: 340px;
  }
}
</style>
