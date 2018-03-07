/**
 * Created by ow on 2018/1/28.
 */
$(function () {

    // banner
        let n=0;
        let lis=$('.bannerpic li');
        let banner=$('.bannertu')
        let right=$('.jiantoudi.right')
        let left=$('.jiantoudi.left')
        let cirs=$('.lunbodian li')

        function move() {
            n++;
            if (n>=lis.length) {
                n=0;
            }
            lis.removeClass('active').eq(n).addClass('active')
            cirs.removeClass('active').eq(n).addClass('active')
        }
        let t=setInterval(move,2000)
        banner.mouseenter(function () {
            clearInterval(t)
        })
        banner.mouseleave(function () {
            t=setInterval(move,2000)
        })
        right.click(function () {
            move()
        })
        left.click(function () {
            // if(!flag){
            //     return
            // }
            // flag=false
            n--;
            if(n<0){
                n=lis.length-1
            }
            lis.removeClass('active').eq(n).addClass('active')
            cirs.removeClass('active').eq(n).addClass('active')
            // flag=true;
        })
      cirs.click(function () {


            // if(!flag){
            //     return
            // }
            // flag=false
            let a=$(this).index()
          lis.removeClass('active').eq(a).addClass('active')
            cirs.removeClass('active').eq(a).addClass('active')
            n=a
      })



    //大聚会
    let nav=$('.djh-top .dajuhui_top_center');
    let list=$('.dajuhui .djh-bottom')
    nav.mouseenter(function () {
        // console.log($(this).index())
        let q=$(this).index()-1
        nav.removeClass('active1').eq(q).addClass('active1')
        list.removeClass('activebtm').eq(q).addClass('activebtm')
    })


    function jiedian(box) {
        let big=box.children('.big')
        let right1=box.children('.right')
        let left1=box.children('.left')
        let w=box.width()
        let a=true;
        function move() {
            let first=big.children().first()
            let last=big.children().last()
            big.animate({left:-w},function () {
                last.befor(first)
                big.css({'left':w+'px'})
                big.animate({left:0})
            })
        }
        right1.click(function () {
            move()
        })

        left1.click(function () {
            let last=big.children().last()
            let first=big.children().first()
            last.after(first)
            big.css({'left':-w+'px'})
            // big.style.left=-w+'px'
            big.animate({left:0})
        })
    }

    // 大聚惠
    let box=$('.djh-bottom')
    jiedian(box)
    let spc=$('.sp-cen-box')
    jiedian(spc)



})

window.onload=function () {


// 侧导航
    let floor=document.querySelectorAll('.floor .diwuceng')
    let celan=document.querySelector('.aside2')
    let aside=document.querySelectorAll('.aside2-list li')
    let h=document.documentElement.clientHeight
    let anniu=document.querySelector('.as-di')
    let hidden=document.querySelector('.hidden')
    let djh=document.querySelector('.dajuhui')
    // let flag=true
    let out=true
    let back=false
    let aaa=true
    let bbb=false
    let flag=true
    window.onscroll=function () {
        if(!flag){
            return
        }
        let tops=document.body.scrollTop?  document.body.scrollTop:document.documentElement.scrollTop
        if(tops>=djh.offsetTop){
            if(out){
                out=false
                hidden.style.display='block'
                back=true
            }
        }else{
            if(back){
                back=false
                hidden.style.display='none'
                out=true
            }
        }
        if(tops>=floor[0].offsetTop-300){
            if(aaa){
                aaa=false
                animate(celan,{opacity:1},100,function () {
                    bbb=true
                })
            }
        }else{
            if(bbb){
                bbb=false
                animate(celan,{opacity:0},100,function () {
                    aaa=true
                })
            }
        }

        floor.forEach(function (val,index) {
            if(tops>=val.offsetTop+400-h){
                aside.forEach(function (va) {
                    va.classList.remove('active')
                })
                aside[index].classList.add('active')
            }
        })
    }

    anniu.onclick=function () {
        animate(document.body,{scrollTop:0})
        animate(document.documentElement,{scrollTop:0},200,function () {
        })
    }
    aside.forEach(function (al,index) {
        al.onclick=function () {
            flag=false
            aside.forEach(function (va) {
                va.classList.remove('active')
            })
            al.classList.add('active')
            let to=floor[index].offsetTop
            animate(document.body,{scrollTop:to})
            animate(document.documentElement,{scrollTop:to},function () {
                flag=true
            })
        }
    })

    let fl=document.querySelector('.fenleibox')
    let flcl=document.querySelector('.fenleibox .celan')
    fl.onmouseover=function () {
        flcl.style.display='block'
    }
    fl.onmouseout=function () {
        flcl.style.display='none'
    }




// 节点轮播




 // 排行双下标轮播

    let now=0;
    let next=0;
    let boxph=document.querySelector('.paihang-xia')
    let ph=document.querySelectorAll('.paihang-xia .phb-list')
    let rightph=document.querySelector('.paihang .jiantoudi.right')
    let leftph=document.querySelector('.paihang .jiantoudi.left')
    let cirsph=document.querySelectorAll('.ph-yuandian li')
    let width=parseInt(window.getComputedStyle(boxph,null).width)
    // let flag=true
    function moveph() {
        if(!flag){
            return
        }
        flag=false
        next=now+1
        if(next>=ph.length){
            next=0
        }
        ph[next].style.left='100%'
        animate(ph[now],{left:-width},300)
        animate(ph[next],{left:0},300,function () {
            flag=true
        })
        cirsph[now].classList.remove('active')
        cirsph[next].classList.add('active')
        now=next
    }
    rightph.onclick=function () {
        moveph()
    }
    leftph.onclick=function () {
        if(!flag){
            return
        }
        flag=false
        next=now-1
        if(next<0){
            next=ph.length-1
        }
        ph[next].style.left='-100%'
        animate(ph[now],{left:width},300)
        animate(ph[next],{left:0},300,function () {
            flag=true
        })
        cirsph[now].classList.remove('active')
        cirsph[next].classList.add('active')
        now=next
    }
    cirsph.forEach(function (val,index) {
        val.onclick=function () {
            if(!flag){
                return
            }
            flag=false
            next=index
            if(next>now){
                ph[next].style.left='100%'
                animate(ph[now],{left:-width},300)
                animate(ph[next],{left:0},300,function () {
                    flag=true
                })
                cirsph[now].classList.remove('active')
                cirsph[next].classList.add('active')
                now=next
            }else if(next<now){
                ph[next].style.left='-100%'
                animate(ph[now],{left:width},300)
                animate(ph[next],{left:0},300,function () {
                    flag=true
                })
                cirsph[now].classList.remove('active')
                cirsph[next].classList.add('active')
                now=next
            }else{
                flag=true
            }
        }
    })

}

    $(function () {
        function aa(a,b) {
            $(a).mouseenter(function () {
                $(b).slideDown(200)
            }).mouseleave(function () {
                $(b).slideUp(200)
            })
        }
        aa('.wangzhan1','.wangzhan')
        aa('.wangzhan2','.wangdis')
        aa('.wangzhan3','.wandis')
        aa('.toubu-right .right3.rightx','.dingdan')
        aa('.toubu-right .right3.right0','.yigou')
        aa('.toubu-right .right3.right9','.gouwu')
        aa('.toubu-right .right3.right09','.shouji')
    })
