/*! Fabrik */

define(["jquery","fab/element"],function(t,i){return window.Fbstarit=new Class({Extends:i,initialize:function(t,i,s){this.field=document.id(t),this.parent(t,i),this.starit=s,this.spinner=new Spinner(this.getContainer()),Fabrik.bootstrapped?this.setupj3():(this.staritup=document.id("staritup"),this.staritdown=document.id("staritdown"),this.options.canUse?(this.imagepath=Fabrik.liveSite+"plugins/fabrik_element/starit/images/",this.staritup.addEvent("mouseover",function(t){this.staritup.setStyle("cursor","pointer"),this.staritup.src=this.imagepath+"starit_up_in.gif"}.bind(this)),this.staritdown.addEvent("mouseover",function(t){this.staritdown.setStyle("cursor","pointer"),this.staritdown.src=this.imagepath+"starit_down_in.gif"}.bind(this)),this.staritup.addEvent("mouseout",function(t){this.staritup.setStyle("cursor",""),"up"===this.options.mystarit?this.staritup.src=this.imagepath+"starit_up_in.gif":this.staritup.src=this.imagepath+"starit_up_out.gif"}.bind(this)),this.staritdown.addEvent("mouseout",function(t){this.staritdown.setStyle("cursor",""),"down"===this.options.mystarit?this.staritdown.src=this.imagepath+"starit_down_in.gif":this.staritdown.src=this.imagepath+"starit_down_out.gif"}.bind(this)),this.staritup.addEvent("click",function(t){this.doAjax("up")}.bind(this)),this.staritdown.addEvent("click",function(t){this.doAjax("down")}.bind(this))):(this.staritup.addEvent("click",function(t){t.stop(),this.doNoAccess()}.bind(this)),this.staritdown.addEvent("click",function(t){t.stop(),this.doNoAccess()}.bind(this))))},setupj3:function(){var t=this.getContainer(),s=t.getElement("button.starit-up"),n=t.getElement("button.starit-down");s.addEvent("click",function(t){if(t.stop(),this.options.canUse){var i=!s.hasClass("btn-success");this.doAjax("up",i),i?(s.addClass("btn-success"),"null"!==typeOf(n)&&n.removeClass("btn-danger")):s.removeClass("btn-success")}else this.doNoAccess()}.bind(this)),"null"!==typeOf(n)&&n.addEvent("click",function(t){if(t.stop(),this.options.canUse){var i=!n.hasClass("btn-danger");this.doAjax("down",i),i?(n.addClass("btn-danger"),s.removeClass("btn-success")):n.removeClass("btn-danger")}else this.doNoAccess()}.bind(this))},doAjax:function(t,i){if(i=!!i,!1===this.options.editable){this.spinner.show();var s={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"starit",method:"ajax_rate",g:"element",element_id:this.options.elid,row_id:this.options.row_id,elementname:this.options.elid,userid:this.options.userid,starit:t,listid:this.options.listid,formid:this.options.formid,add:i};new Request({url:"",data:s,onComplete:function(t){if(t=JSON.parse(t),this.spinner.hide(),t.error)console.log(t.error);else if(""!==t)if(Fabrik.bootstrapped){var i=this.getContainer();i.getElement("button.starit-up .starit-count").set("text",t[0]),"null"!==typeOf(i.getElement("button.starit-down"))&&i.getElement("button.starit-down .starit-count").set("text",t[1])}else{var s=document.id("count_staritup"),n=document.id("count_staritdown"),e=document.id("staritup"),o=document.id("staritdown");s.set("html",t[0]),n.set("html",t[1]),this.getContainer().getElement("."+this.field.id).value=t[0].toFloat()-t[1].toFloat(),"1"===t[0]?(e.src=this.imagepath+"starit_up_in.gif",o.src=this.imagepath+"starit_down_out.gif"):(e.src=this.imagepath+"starit_up_out.gif",o.src=this.imagepath+"starit_down_in.gif")}}.bind(this)}).send()}},doNoAccess:function(){""!==this.options.noAccessMsg&&window.alert(this.options.noAccessMsg)}}),window.Fbstarit});
