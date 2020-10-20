<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input
                v-model="listQuery.title"
                placeholder="书名"
                style="width: 200px"
                class="filter-item"
                clearable
                @keyup.enter.native="handleFilter"
                @clear="handleFilter"
                @blur="handleFilter"
            />
            <el-input
                v-model="listQuery.author"
                placeholder="作者"
                style="width: 200px"
                class="filter-item"
                clearable
                @keyup.enter.native="handleFilter"
                @clear="handleFilter"
                @blur="handleFilter"
            />
            <el-select
                v-model="listQuery.category"
                placeholder="分类"
                clearable
                class="filter-item"
                @change="handleFilter">
                <el-option
                    v-for="item in categoryList"
                    :key="item.value"
                    :label="item.label + '(' + item.num + ')'"
                    :value="item.value"
                />
            </el-select>
            <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                @click="handleFilter"
            >查询</el-button>
            <el-button
                class="filter-item"
                type="primary"
                icon="el-icon-edit"
                @click="handleCreate"
            >新增</el-button>
            <el-checkbox
                v-model="showCover"
                class="filter-item"
                @change="changeShowCover"
            >显示封面
            </el-checkbox>
        </div>
        <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%"
            @sort-change="sortChange"
        >
            <el-table-column
                label="ID"
                prop="id"
                sortable="custom"
                align="center"
                width="80"
            />
            <el-table-column label="书名" width="150" align="center">
                <template slot-scope="{ row: {titleWrapper}}">
                    <span v-html="titleWrapper" />
                </template>
            </el-table-column>
            <el-table-column label="作者" width="150" align="center">
                <template slot-scope="{ row: {authorWrapper}}">
                    <span v-html="authorWrapper" />
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="120" fixed="right">
                <template slot-scope="{ row }">
                    <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)" />
                </template>
            </el-table-column>
            <el-table-column v-if="showCover" label="封面" align="center">
                <template slot-scope="scope">
                    <a :href="scope.row.cover" target="_black">
                        <img :src="scope.row.cover" style="width: 120px;height: 180px" />
                    </a>
                </template>
            </el-table-column>
            <el-table-column label="出版社" prop="publisher" width="150" align="center"></el-table-column>
            <el-table-column label="分类" prop="categoryText" width="100" align="center"></el-table-column>
            <el-table-column label="语言" prop="language" align="center"></el-table-column>
            <el-table-column label="文件名" prop="fileName" align="center" width="100"></el-table-column>
            <el-table-column label="文件路径" prop="filePath" align="center" width="100"></el-table-column>
            <el-table-column label="封面路径" prop="coverPath" align="center" width="100"></el-table-column>
            <el-table-column label="解压路径" prop="unzipPath" align="center" width="100"></el-table-column>
            <el-table-column label="上传人" prop="createUser" align="center" width="100"></el-table-column>
            <el-table-column label="上传时间" prop="createDate" align="center" width="100"></el-table-column>
        </el-table>
        <Pagination
            :total="total"
            v-show="total > 0"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
        />
    </div>
</template>

<script>
import Pagination from '../../components/Pagination/index'
import waves from '@/directive/waves/waves'
import {getCategory, listBook} from '@/api/book'

export default {
    components: {Pagination},
    directives: {waves},
    data() {
        return {
            listQuery: {},
            showCover: false,
            categoryList: [],
            tableKey: 0,
            listLoading: true,
            list: [],
            total: 0
        }
    },
    created() {
        this.parseQuery()
    },
    mounted() {
        this.getCategoryList()
        this.getList()
    },
    methods: {
        // 解析查询条件
        parseQuery() {
            let listQuery = {
                page: 1,
                pageSize: 20,
                sort: '+id'
            }
            this.listQuery = {...listQuery, ...this.listQuery}
        },
        // 包装关键字，处理搜出的关键字高亮
        wrapperKeyword(k, v) {
            function highLight(value) {
                return `<span style="color: #13ce66">${value}</span>`
            }
            if (!this.listQuery[k]) {
                return v
            } else {
                return v.replace(RegExp(this.listQuery[k], 'ig'), v => highLight(v))
            }
        },
        // 获取表格数据
        getList() {
            this.listLoading = true
            listBook(this.listQuery).then(response => {
                const { list, count } = response.data
                this.total = count
                this.list = list
                this.listLoading = false
                this.list.forEach(book => {
                    book.titleWrapper = this.wrapperKeyword('title', book.title)
                    book.authorWrapper = this.wrapperKeyword('author', book.author)
                })
            })
        },
        // 排序
        sortChange(data) {
            console.log(data)
            const {prop, order} = data
            this.sortBy(prop, order)
        },
        sortBy(prop, order) {
            if (order === 'ascending') {
                this.listQuery.sort = `+${prop}`
            } else {
                this.listQuery.sort = `-${prop}`
            }
            this.handleFilter()
        },
        // 获取分类列表
        getCategoryList() {
            getCategory().then(response => {
                this.categoryList = response.data
            })
        },
        // 处理筛选
        handleFilter() {
            this.getList()
        },
        // 处理创建，跳转至图书创建页面
        handleCreate() {
            this.$router.push('/book/create')
        },
        // 编辑图书信息
        handleUpdate(row) {
            this.$router.push(`/book/edit/${row.fileName}`)
        },
        // 控制是否展示封面
        changeShowCover(val) {
            this.showCover = val
        }
    }
}
</script>

<style scoped lang="scss">
.filter-item {
    margin-right: 10px
}
</style>
