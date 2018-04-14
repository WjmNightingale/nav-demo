//初始化数据
localStorage.clear()
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']

//生成键盘
//遍历生成keys，生成kbd标签
generateKeyboard(keys, hash)

//监听用户动作
listenToUser(hash)

//下面是工具函数
function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag(tagName) {
    return document.createElement(tagName)
}

function createSpan(textContent) {
    var span = tag('span')
    span.textContent = textContent
    return span
}

function bindEdit() {
    console.log('111')
    let editButtons = document.querySelectorAll('#edit')
    console.log(editButtons)
    console.log('222')
    editButtons.forEach((editButton) => {
        editButton.addEventListener('click', (e) => {
            console.log(e.target)
            let targetImg = e.target.parentNode.previousSibling.previousSibling
            console.log(targetImg)
            let key = e.target.parentNode.previousSibling.textContent
            console.log(key)
            // let editSite = 'www'
            // console.log(`http://${editSite}/favicon.ico`)
            var editSite = prompt('请输入新的自定义网址')
            if (editSite) {
                hash[key] = editSite
                targetImg.src = `http://${editSite}/favicon.ico`
                targetImg.onerror = (e) => {
                    e.target.src = './cry.png'
                    alert('Soory,请确认输入的自定义网址是否有误')
                }
            }
            localStorage.setItem('nav', JSON.stringify(hash))
        }, false)
    })
}

function bindReset() {
    let resetButtons = document.querySelectorAll('#reset')
    resetButtons.forEach((resetButton) => {
        resetButton.addEventListener('click', (e) => {
            let targetImg = e.target.parentNode.previousSibling.previousSibling
            targetImg.src = './cleared-1.png'
            let key = e.target.parentNode.previousSibling.textContent
            hash[key] = ''
            localStorage.setItem('nav', JSON.stringify(hash))
            alert('即将重置该键位')
        }, false)
    })
}

function bindRestore() {
    let restoreButton = document.querySelector('#restore')
    restoreButton.addEventListener('click',(e) => {
        localStorage.clear()
        location.reload(true)
        alert('即将恢复默认键位')
    },false)
}

function bindHover() {
    let kbds = document.querySelectorAll('.wrapper kbd')
    kbds.forEach((kbd) => {
        // console.log(kbd)
        kbd.addEventListener('mouseover',(e) => {
            console.log('悬浮事件')
            let key = kbd.childNodes[2].textContent
            let titleText = hash[key]
            console.log(titleText)
            kbd.title = titleText
        },false)
    })
}
bindEdit()
bindReset()
bindRestore()
bindHover()

function createImg(domain) {
    var img = tag('img')

    if (domain != undefined && domain !== '') {
        img.src = 'http://' + domain + '/favicon.ico'
    } else if (domain === '') {
        img.src = 'cleared-1.png'
    } else {
        img.src = 'emotion-black.png'
    }

    img.onerror = function (event) {
        event.target.src = 'cry.png'
        alert(`Soory,无法获取${domain}的favicon图标`)
    }
    return img
}

function restoreDefault() {
    var keys = {
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
            length: 10
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
            length: 10
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
            length: 9
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
            length: 8
        },
        'length': 4
    }
    var hash = {
        'q': 'qq.com',
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
    return {
        "keys": keys,
        "hash": hash
    }
}

function init() {
    console.log('init----')
    var keys = {
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
            length: 10
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
            length: 10
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
            length: 9
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
            length: 8
        },
        'length': 4
    }
    var hash = {
        'q': 'qq.com',
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
        'b': 'baidu.com'
    }
    console.log('246')
    var hashInLocalStorage = getFromLocalStorage('nav')
    console.log('247')
    if (hashInLocalStorage) {
        hash = hashInLocalStorage
    }
    return {
        "keys": keys,
        "hash": hash
    }
}

function generateKeyboard(keys, hash) {
    let keysLength = keys['length']
    console.log('keys--',keysLength)
    for (var i = 0; i < keysLength; i = i + 1) {
        console.log('第' + i + '次循环')
        var rowDiv = tag('div')
        rowDiv.className = 'row'
        wrapper.appendChild(rowDiv)

        var row = keys[i]
        let rowLength = row['length']
        console.log('row--',rowLength)
        for (var j = 0; j < rowLength; j = j + 1) {
            console.log('i--',i)
            // kbd > img
            var img = createImg(hash[row[j]])

            // kbd > popover
            var popover = tag('span')
            popover.className = 'popover'
            popover.textContent = 'bilibili.com'

            // kbd > popover > triangle
            var triangle = tag('span')
            triangle.className = 'triangle'
            popover.appendChild(triangle)

            // kbd > span
            var span = createSpan(row[j])
            if (i === keysLength-1 && j === rowLength-1) {
                // 标记restore
                span.id = row[j]
            }

            // kbd > div > (svg*2)
            var featureDiv = tag('div')
            featureDiv.className = 'feature'
            var svgTemplate = `
            <svg id="reset" class="icon" aria-hidden="true">
              <use xlink:href="#icon-x"></use>
            </svg>
            <svg id="edit" class="icon" aria-hidden="true">
              <use xlink:href="#icon-pen"></use>
            </svg>
            `
            featureDiv.innerHTML = svgTemplate

            // kbd
            var kbd = tag('kbd')
            kbd.appendChild(img)
            kbd.appendChild(popover)
            kbd.appendChild(span)
            kbd.appendChild(featureDiv)

            rowDiv.appendChild(kbd)

        }
    }
}

function listenToUser(hash) {
    document.onkeypress = function (event) {
        var key = event['key']
        var website = hash[key]
        window.open('http://' + website, '_blank')
    }
}