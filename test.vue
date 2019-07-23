<template>
    <div>
         <FormItem label="标签" prop="tags" >
            <p :style="{color:'#c5c8ce'}">与当前视频相关，最多不超过5个，每个标签最多2个字</p>
            <div :style="{border:'1px solid #c5c8ce','border-radius':'4px'}">
            <Tag type="border" color="gold" v-for="item in validTagList"
                :key="item.name" closable :name="item.name"
                @on-close="closeTag(item)"
                >{{item.name}}</Tag>
            <input type="text" :style="{border:'none'}"
                @keyup.enter="pushTag" v-model="tagText"
                @blur="pushTag"
                maxlength="2"
            >
            </div>
            <span v-show="tagMaxTip" style="color:red">标签只限于2字 </span> 
            <span v-show="noSameTag" :style="{color:'red','margin-left':'20px'}">添加无效，该标签已存在</span>
            <span v-show="showTagMax" :style="{color:'red','margin-left':'20px'}">添加无效，标签数不超过5个</span>
            
            <div class="upload_tip">推荐标签：
                <span v-for="(item,index) in recTagList" :key="index"  class="mar_left10">
                <Tag v-if="index < 5" @click.native="addRecTag(item)">{{item.name}}</Tag>
                </span>
            </div>
        </FormItem>
    </div>
</template>

<script>
    export default {
        computed: {
            tagLength(){
                return this.form.tagIds.length +　this.form.tagName.length
            }
        },
        data() {
            return {
                recTagList:[],  // 推荐标签列表
                tagText:'',
                warningTip:'',
                timer:'',
                form:{
                    tagIds: [], // 选择推荐的标签
                    tagName: [],    // 自创建的标签
                },
                validTagList:[]
            }
        },
        watch: {
            warningTip(val){
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.warningTip = ''
                },2000)
            }
        },
        mounted() {
            this.getTag()
        },
        methods: {
            closeTag(item){ // 关闭所选标签
                this.validTagList = this.validTagList.reduce((acc,cur) => {
                    if(cur.name !== item.name){
                        acc.push(cur)
                    }
                    return acc
                },[])

                if(item.id){    // 在form里删除推荐的标签
                    let index = this.form.tagIds.indexOf(item.id)
                    this.form.tagIds.splice(index,1)
                    return
                }
                // 删除自建的标签
                let index = this.form.tagName.indexOf(item.name)
                this.from.tagName.splice(index,1)
            },
            addRecTag(tag){
                if(this.tagLength >= 5){
                    this.warningTip = '添加无效，标签数不超过5个'
                    return 
                }
                this.form.tagIds.push(tag.id)
                this.validTagList.push(tag)
            },
            pushTag() {
                if (this.tagLength >= 5) {
                    this.warningTip = '添加无效，标签数不超过5个'
                    return;
                }
                
                if (this.tagText) {
                    if(this.tagText.length !== 2) {
                        this.warningTip = "每个标签只能是两个字"
                        return
                    }

                    if(this.form.tagName.includes(this.tagText)) {
                        this.warningTip = '添加无效，该标签已存在'
                        return
                    }
                    let tag = this.tagText.replace(/\s/g,'')
                    this.form.tagName.push(tag)
                    this.validTagList.push({name:tag})
                    this.tagText = ''
                }
                let tag = this.tagText.replace(/\s/g, "");
                this.form.tagName.push(tag);
                this.tagText = "";
            },
            getTag() {
                var _this = this;
                recommandTag({
                    size: 14,
                    currentUserId: _this.global.thisUserId()
                }).then(res => {
                    if (res.code == 0) {
                        _this.recTagList = res.data.content;
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>