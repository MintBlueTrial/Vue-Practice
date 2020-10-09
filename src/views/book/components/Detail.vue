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
                    <EBookUpload
                        :file-list="fileList"
                        :disabled="isEdit"
                        @onSuccess="onUploadSuccess"
                        @onRemove="onUploadRemove"
                    />
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="title">
                        <md-input v-model="postForm.title" :maxlength="100" name="name" required>
                            书名
                        </md-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="作者：" :label-width="labelWidth">
                                <el-input v-model="postForm.author" placeholder="作者" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="出版社：" :label-width="labelWidth">
                                <el-input v-model="postForm.publisher" placeholder="出版社" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="语言：" :label-width="labelWidth">
                                <el-input v-model="postForm.language" placeholder="语言" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="根文件：" :label-width="labelWidth">
                                <el-input v-model="postForm.rootFile" placeholder="根文件" disabled />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="文件路径：" :label-width="labelWidth">
                                <el-input v-model="postForm.filePath" placeholder="文件路径" disabled />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="解压路径：" :label-width="labelWidth">
                                <el-input v-model="postForm.unzipPath" placeholder="解压路径" disabled />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="封面路径：" :label-width="labelWidth">
                                <el-input v-model="postForm.coverPath" placeholder="封面路径" disabled />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="文件名称：" :label-width="labelWidth">
                                <el-input v-model="postForm.fileName" placeholder="文件名称" disabled />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="封面：" :label-width="labelWidth">
                                <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
                                    <img alt="" :src="postForm.cover" class="preview-img">
                                </a>
                                <span v-else>无</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="目录：" :label-width="labelWidth">
                                <div v-if="postForm.contents && postForm.contents.length > 0" class="contents-wrapper">
                                    <el-tree />
                                </div>
                                <span v-else>无</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </el-form>
</template>

<script>
import Sticky from '@/components/Sticky/index'
import Warning from '@/views/book/components/Warning'
import EBookUpload from '@/components/EBookUpload'
import MdInput from '@/components/MDinput/index'

export default {
    name: 'Detail',
    components: { MdInput, Warning, Sticky, EBookUpload },
    props: {
        isEdit: Boolean
    },
    data() {
        return {
            loading: false,
            postForm: {
                status: '',
                title: '', // 书名
                author: '', // 作者
                publisher: '', // 出版社
                language: '', // 语种
                rootFile: '', // 根文件路径
                cover: '', // 封面图片URL
                coverPath: '', // 封面图片路径
                fileName: '', // 文件名
                originalName: '', // 文件原始名称
                filePath: '', // 文件所在路径
                unzipPath: '', // 解压文件所在路径
                contents: [] // 目录
            },
            fileList: [],
            labelWidth: '120px'
        }
    },
    methods: {
        // 展示说明
        showGuide() {
            console.log('Guide')
        },
        // 提交表单信息
        submitForm() {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
        // 上传成功事件
        onUploadSuccess() {
            console.log(123)
        },
        // 上传移除事件
        onUploadRemove() {
            console.log(456)
        }
    }
}
</script>

<style scoped lang="scss">
    .detail-container {
        padding: 40px 50px 20px;
        .preview-img {
            width: 200px;
            height: 270px;
        }
    }
</style>
