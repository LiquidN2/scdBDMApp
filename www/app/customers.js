

var vpsApp = {
    customers: {}
    ,_target: 0
    ,'lookup': function(){
        app.postJSON('customers/list',myApp.formToJSON('#frm-search-customer')
            ,function(data){
                if ('error' in data){
                    app.validToken(data);
                    return false;
                }
                if (!('items' in data)){
                    appPasscode.notify = myApp.addNotification({
                        title: 'Error Data',
                        message:'Invalid data loaded. Please check with system admin.'
                    });
                    return false;
                }

                if (data.items.length == 0){
                    appPasscode.notify = myApp.addNotification({
                        title: 'Not found',
                        message:'No data match.'
                    });
                    return false;
                }
                vpsApp.customers = data.items;
                mainView.router.loadPage('pages/customer_list.html');

            }
        );
    }
    ,'list': function(){
        txt = '';
        $$.each(this.customers,function(index,item){
            txt+= '<li><a class="item-link item-content" href="#" onclick="vpsApp.info('+index+')">'
                +'<div class="item-inner"><div class="item-title">'
                +'<i class="fa fa-user"></i> '+item.code+'<br>'
                +'<b>'+item.name+'</b><br>'
                +'<span class="address">'+item.address + (item.address2 != '' ? '<br>'+item.address2 : '')
                +'<br>'+item.suburb+' '+item.state+' '+item.postcode+'</span>'
                +'<br>T: '+item.phone
                +'</div>'
                +'</div></a></li>';
        })
        $$('#page-customer-list').html('<ul>'+txt+'</ul>');
    }
    ,'info':function(index){
        vpsApp._target = index;
        mainView.router.loadPage('pages/customer_info.html');

    }
}