/**
<body>
    <a href="" id="download">下载</a>
</body>
*/



// 通用的csv下载逻辑
export const downLoadCsv = (id, thead, tBody, name) => {
    const bom = '\uFEFF';
    const table = bom + thead + tBody;
    const downLoadTable = document.getElementById(id);
    downLoadTable.href = 'data:text/csv,' + encodeURIComponent(table);
    downLoadTable.target = '_blank';
    downLoadTable.download = `${name}.csv`;
};
const datasource = [
    {
        "rank": "31",
        "bid_name": "宝骏",
        "rank_change": "15",
    },
    {
        "rank": "32",
        "bid_name": "奇瑞",
        "rank_change": "5",
    },
    {
        "rank": "33",
        "bid_name": "讴歌",
        "rank_change": "38",
    },
]
const tHead = `排名,品牌,排名环比\n`;
let tBody = '';
datasource.forEach((child) => {
    tBody +=
        child.rank +
        ',' +
        child.bid_name.replace(/,|#|\n/g, '，') +
        ',' +
        child.rank_change +
        '\n';
});
const name = `下载名称`;
downLoadCsv('download', tHead, tBody, name);