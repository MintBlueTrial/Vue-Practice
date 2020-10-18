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
        <el-table />
        <Pagination
            :total="0"
        />
    </div>
</template>

<script>
import Pagination from '../../components/Pagination/index'
import waves from '@/directive/waves/waves'
import {getCategory} from '@/api/book'

export default {
    components: {Pagination},
    directives: {waves},
    data() {
        return {
            listQuery: {
                title: ''
            },
            showCover: false,
            categoryList: []
        }
    },
    mounted() {
        this.getCategoryList()
    },
    methods: {
        getCategoryList() {
            getCategory().then(response => {
                this.categoryList = response.data
            })
        },
        handleFilter() {

        },
        handleCreate() {
            this.$router.push('/book/create')
        },
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
