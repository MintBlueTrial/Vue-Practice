<template>
    <div class="upload-container">
        <el-upload
            :action="action"
            :headers="headers"
            :multiple="false"
            :limit="1"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
            :on-remove="onRemove"
            :file-list="fileList"
            :on-exceed="onExceed"
            :disabled="disabled"
            drag
            show-file-list
            accept="application/epub+zip"
            class="image-upload"
        >
            <i class="el-icon-upload" />
            <div class="el-upload__text" v-if="fileList.length === 0">
                请将电子书拖入或 <em>点击上传</em>
            </div>
            <div class="el-upload__text" v-else>图书已上传</div>
        </el-upload>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
    props: {
        fileList: {
            type: Array,
            default() {
                return []
            }
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            action: `${process.env.VUE_APP_BASE_API}/book/upload`
        }
    },
    computed: {
        headers() {
            return {
                Authorization: `Bearer ${getToken()}`
            }
        }
    },
    methods: {
        beforeUpload(file) {
            this.$emit('beforeUpload', file)
        },
        onSuccess() {},
        onError(err) {
            const errInfo = err.message && JSON.parse(err.message)
            this.$message({
                message: (errInfo.msg && `上传失败: ${errInfo.msg}`) || errInfo,
                type: 'error'
            })
            this.$emit('onError', err)
        },
        onRemove() {},
        onExceed() {
            this.$message({
                message: '每次只能上传一个文件',
                type: 'warning'
            })
        }
    }
}
</script>

<style scoped>

</style>
