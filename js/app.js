init()
//页面初始化
function init() {
    let keys = {
        '0': {
            0: '1',
            1: '2',
            2: '3',
            3: '4',
            4: '5',
            5: '6',
            6: '7',
            7: '8',
            8: '9',
            9: '0',
            'length': 10
        },
        '1': {
            0: 'q',
            1: 'w',
            2: 'e',
            3: 'r',
            4: 't',
            5: 'y',
            6: 'u',
            7: 'i',
            8: 'o',
            9: 'p',
            'length': 10
        },
        '2': {
            0: 'a',
            1: 's',
            2: 'd',
            3: 'f',
            4: 'g',
            5: 'h',
            6: 'j',
            7: 'k',
            8: 'l',
            'length': 9
        },
        '3': {
            0: 'z',
            1: 'x',
            2: 'c',
            3: 'v',
            4: 'b',
            5: 'n',
            6: 'm',
            7: 'restore',
            'length': 8
        },
        'length': 4
    }
    let hash = {
        'w': 'weibo.com',
        'e': '163.com',
        't': 'taobao.com',
        'i': 'www.ifeng.com',
        'a': 'iqiyi.com',
        'g': 'github.com',
        'd': 'douban.com',
        'j': 'www.jd.com',
        'l': 'bilibili.com',
        'z': 'zhihu.com',
        'b': 'baidu.com',
        'm': 'developer.mozilla.org'
    }
    let engine = {
        'g': 'https://www.google.com/search?q=',
        'b': 'https://www.bing.com/search?q='
    }
    // 根据初始数据生成导航键盘
    generateKeyboard(keys, hash)
    // 监听键盘按键
    bindKeyboard(hash)
    // 鼠标点击
    // bindKbdClick(hash)
    // 悬浮提示网址
    bindKbdHover(hash)
    // 修改导航网址
    bindEdit(hash)
    // 重置键位绑定的导航网址
    bindReset(hash)
    //  恢复默认值
    bindRestore()
    // 切换搜索引擎
    bindAction(engine)
}

// 生成键盘html结构
function generateKeyboard(keys, hash) {
    let wrapper = getElementById('wrapper')
    let keysLength = keys['length']
    for (let i = 0; i < keysLength; i++) {
        let rowDiv = createTag('div')
        rowDiv.className = 'row'
        let wrapper = getElementById('wrapper')
        let row = keys[i]
        let rowLength = row['length']
        for (let j = 0; j < rowLength; j++) {
            // kbd > img
            let img = createImg(hash[row[j]])
            // kbd > span
            let span = createTag('span', row[j])
            if (i === keysLength - 1 && j === rowLength - 1) {
                // 表示restore键
                span.id = row[j]
            }
            // kbd > div > (svg*2)
            let featureDiv = createTag('div')
            featureDiv.className = 'feature'
            let featureTemplate = `
            <svg id="reset" class="icon" aria-hidden="true">
              <use xlink:href="#icon-x"></use>
            </svg>
            <svg id="edit" class="icon" aria-hidden="true">
              <use xlink:href="#icon-pen"></use>
            </svg>
            `
            featureDiv.innerHTML = featureTemplate
            // kbd
            let kbd = createTag('kbd')
            //添加到文档
            kbd.appendChild(img)
            kbd.appendChild(span)
            kbd.appendChild(featureDiv)
            rowDiv.appendChild(kbd)
        }
        wrapper.appendChild(rowDiv)
    }
}

// 键盘事件
function bindKeyboard(hash) {
    document.addEventListener('keypress', (e) => {
        let key = e.key
        let website = hash[key]
        window.open(`http://${website}`, '_blank')
    }, false)
}
// 鼠标点击
// function bindKbdClick(hash) {
//     let kbds = getElementsBySelector('.wrapper kbd')
//     kbds.forEach((kbd) => {
//         kbd.addEventListener('click',(e) => {
//             let key = kbd.childNodes[1].textContent
//             let website = hash[key]
//             window.open(`http://${website}`, '_blank')
//         },false)
//     })
// }

// 修改导航网址
function bindEdit(hash) {
    let editButtons = getElementsBySelector('#edit')
    editButtons.forEach((editButton) => {
        editButton.addEventListener('click', (e) => {
            let ico = e.target.parentNode.previousSibling.previousSibling
            let key = e.target.parentNode.previousSibling.textContent
            let newWebsite = prompt('请输入新的自定义网址')
            if (newWebsite.trim().length > 0) {
                hash[key] = newWebsite
                ico.src = `http://${newWebsite}/favicon.ico`
                ico.onerror = (e) => {
                    e.target.src = 'images/cry.png'
                    alert('抱歉,请确认输入的自定义网址是否有误')
                }
            } else {
                alert('不允许输入空值')
                return false
            }
            localStorage.setItem('nav', JSON.stringify(hash))
        }, false)
    })
}

// 重置键位绑定的导航网址
function bindReset(hash) {
    let resetButtons = getElementsBySelector('#reset')
    resetButtons.forEach((resetButton) => {
        resetButton.addEventListener('click', (e) => {
            let ico = e.target.parentNode.previousSibling.previousSibling
            ico.src = 'images/cleared.png'
            let key = e.target.parentNode.previousSibling.textContent
            hash[key] = ''
            operateLocalStorage(key, hash)
            alert('即将重置该键位')
        }, false)
    })
}

// 恢复默认值
function bindRestore() {
    let restoreButton = getElementById('restore')
    restoreButton.addEventListener('click', (e) => {
        window.localStorage.clear()
        location.reload(true)
        alert('即将恢复默认键位导航')
    }, false)
}

// 悬浮提示网址
function bindKbdHover(hash) {
    let kbds = getElementsBySelector('.wrapper kbd')
    kbds.forEach((kbd) => {
        kbd.addEventListener('mouseover', (e) => {
            let targetElement = kbd.childNodes[1]
            let key = targetElement.textContent
            let titleText = hash[key]
            if (titleText === undefined || titleText === '') {
                titleText = '该键未关联导航网址'
            }
            if (targetElement.id === 'restore') {
                titleText = '点击使用默认导航'
            }
            kbd.title = titleText
        }, false)
    })
}

// 切换搜索引擎
function bindAction(engine) {
    let actionButton = getElementBySelector('.action')
    actionButton.addEventListener('click', (e) => {
        let key = e.target.value
        let url = engine[key]
        let keyword = getElementBySelector('.search > input').value
        if (keyword.trim().length > 0) {
            url = url + keyword
            window.open(url, '_blank')
        } else {
            alert('请输入搜索的关键词')
        }
    }, false)
}

// 工具函数
function operateLocalStorage(key, obj) {
    if (obj === undefined) {
        return JSON.parse(localStorage.getItem(key) || null)
    } else {
        localStorage.setItem(key, JSON.stringify(obj) || null)
    }
}

function createTag(tagName, text) {
    if (text === undefined) {
        return document.createElement(tagName)
    } else {
        let tag = createTag(tagName)
        tag.textContent = text
        return tag
    }
}

function getElementById(id) {
    return document.getElementById(id)
}

function getElementBySelector(selector) {
    return document.querySelector(selector)
}

function getElementsBySelector(selector) {
    return document.querySelectorAll(selector)
}

function createImg(domain) {
    let img = createTag('img')
    if (domain !== undefined && domain !== '') {
        img.src = `http://${domain}/favicon.ico`
    } else if (domain === '') {
        img.src = 'images/cleared.png'
    } else {
        img.src = 'images/emotion.png'
    }
    img.onerror = (e) => {
        e.target.src = 'images/cry.png'
        alert(`抱歉，${domain}的网站图标无法获取`)
    }
    return img
}