//初始化数据
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']

//生成键盘
//遍历生成keys，生成kbd标签
generateKeyboard(keys, hash)

//监听用户动作
listenToUser(hash)

//下面是工具函数
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || 'null')
}
function saveDataToLocalStorage(key,obj) {
    localStorage.setItem(key,JSON.stringify(obj) || 'null')
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
    let editButtons = document.querySelectorAll('#edit')
    editButtons.forEach((editButton) => {
        editButton.addEventListener('click', (e) => {
            let targetImg = e.target.parentNode.previousSibling.previousSibling
            let key = e.target.parentNode.previousSibling.textContent
            var editSite = prompt('请输入新的自定义网址')
            console.log('---',editSite)
            if (editSite.trim().length !== 0) {
                console.log('2222')
            } else {
                console.log('不允许为空')
            }
            // if (editSite) {
            //     hash[key] = editSite
            //     targetImg.src = `http://${editSite}/favicon.ico`
            //     targetImg.onerror = (e) => {
            //         e.target.src = './cry.png'
            //         alert('Soory,请确认输入的自定义网址是否有误')
            //     }
            // }
            // localStorage.setItem('nav', JSON.stringify(hash))
            var reg = '^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$'
        }, false)
    })
}

function bindKbdEdit() {
    document.addEventListener('keydown',(e) => {
        // e.preventDefault()
        if (e.ctrlKey && e.keyCode === 69 ) {
            alert('修改')
        } else if (e.ctrlKey && e.keyCode === 68) {
            alert('重置')
        } else if (e.ctrlKey && e.keyCode === 82) {
            alert('恢复默认值')
        }
    },false)
}
bindKbdEdit()

function bindReset() {
    let resetButtons = document.querySelectorAll('#reset')
    resetButtons.forEach((resetButton) => {
        resetButton.addEventListener('click', (e) => {
            let targetImg = e.target.parentNode.previousSibling.previousSibling
            targetImg.src = './cleared.png'
            let key = e.target.parentNode.previousSibling.textContent
            hash[key] = ''
            localStorage.setItem('nav', JSON.stringify(hash))
            alert('即将重置该键位')
        }, false)
    })
}

function bindRestore() {
    let restoreButton = document.querySelector('#restore')
    restoreButton.addEventListener('click', (e) => {
        localStorage.clear()
        location.reload(true)
        alert('即将恢复默认键位')
    }, false)
}

function bindHover() {
    let kbds = document.querySelectorAll('.wrapper kbd')
    kbds.forEach((kbd) => {
        kbd.addEventListener('mouseover', (e) => {
            let key = kbd.childNodes[1].textContent
            let titleText = hash[key]
            if (titleText === undefined) {
                titleText = '该键未关联导航网址'
            }
            if (kbd.childNodes[1].id === 'restore') {
                titleText = '使用默认键位导航'
            }
            kbd.title = titleText
        }, false)
    })
}
function bindAction() {
    let actionButton = document.querySelector('.action')
    let engineData = JSON.parse(localStorage.getItem('engine'))
    actionButton.addEventListener('click',(e) => {
       let key = e.target.value
       let url = engineData[key]
       let keyword = document.querySelector('.search > input').value
       console.log(typeof keyword)
       if (keyword === '') {
           alert('请输入搜索的关键词')
       } else {
        url = url + keyword
        window.open(url, '_blank')
       }
    },false)
}
bindEdit()
bindReset()
bindRestore()
bindHover()
bindAction()

function createImg(domain) {
    var img = tag('img')

    if (domain != undefined && domain !== '') {
        img.src = 'http://' + domain + '/favicon.ico'
    } else if (domain === '') {
        img.src = 'cleared.png'
    } else {
        img.src = 'emotion.png'
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
    // var searchEngine = {
    //     'g': 'https://www.google.com/search?q=',
    //     'b': 'https://www.bing.com/search?q='
    // }
    return {
        "keys": keys,
        "hash": hash,
    }
}

function init() {
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
        // 'w': 'weibo.com',
        // 'e': '163.com',
        // 't': 'taobao.com',
        // 'i': 'www.ifeng.com',
        // 'a': 'iqiyi.com',
        // 'g': 'github.com',
        // 'd': 'douban.com',
        // 'j': 'www.jd.com',
        // 'l': 'bilibili.com',
        // 'z': 'zhihu.com',
        // 'b': 'baidu.com',
        // 'm': 'developer.mozilla.org'
    }
    var searchEngine = {
        'g': 'https://www.google.com/search?q=',
        'b': 'https://www.bing.com/search?q='
    }
    localStorage.setItem('engine',JSON.stringify(searchEngine))
    var hashInLocalStorage = getFromLocalStorage('nav')
    if (hashInLocalStorage) {
        hash = hashInLocalStorage
    }
    return {
        "keys": keys,
        "hash": hash,
    }
}

function generateKeyboard(keys, hash) {
    let keysLength = keys['length']
    for (var i = 0; i < keysLength; i = i + 1) {
        var rowDiv = tag('div')
        rowDiv.className = 'row'
        wrapper.appendChild(rowDiv)

        var row = keys[i]
        let rowLength = row['length']

        for (var j = 0; j < rowLength; j = j + 1) {
            // kbd > img
            var img = createImg(hash[row[j]])
            // kbd > span
            var span = createSpan(row[j])

            if (i === keysLength - 1 && j === rowLength - 1) {
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
            kbd.appendChild(span)
            kbd.appendChild(featureDiv)
            rowDiv.appendChild(kbd)

        }
    }
}

function listenToUser(hash) {
    document.addEventListener('keypress',(e) => {
        let key = e.key
        let website = hash[key]
        window.open('http://' + website, '_blank')
    },false)
}