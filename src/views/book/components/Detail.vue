<template>
    <el-form ref="postForm" :model="postForm">
        <sticky :class-name="'sub-navbar ' + postForm.status">
            <el-button v-if="!isEdit" @click="showGuide">显示帮助</el-button>
            <el-button
                v-loading="loading"
                type="success"
                style="margin-left: 10px"
                @click="submitForm"
            >
                {{ isEdit ? '编辑电子书' : '新增电子书' }}
            </el-button>
        </sticky>
        <div class="detail-container">
            <el-row>
                <warning />
                <el-col :span="24">
                    <EBookUpload />
                </el-col>
                <el-col :span="24" />
            </el-row>
        </div>
    </el-form>
</template>

<script>
import Sticky from '@/components/Sticky/index'
import Warning from '@/views/book/components/Warning'
import EBookUpload from '@/components/EBookUpload'

export default {
    name: 'Detail',
    components: { Warning, Sticky, EBookUpload },
    props: {
        isEdit: Boolean
    },
    data() {
        return {
            loading: false,
            postForm: {
                status: ''
            }
        }
    },
    methods: {
        showGuide() {
            console.log('Guide')
        },
        submitForm() {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1000)
        }
    }
}
</script>

<style scoped lang="scss">
    .detail-container {
        padding: 40px 50px 20px;
    }
</style>
