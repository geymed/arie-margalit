if ((document.all)&&(! document.getElementById)) /*ie4 compatability*/
 {
  document.getElementById=function(id){return(document.all(id));};
  document.getElementsByTagName=function(id){return(document.all.tags(id));};
 }
if(document.layers) /*ns4 compatability*/
 { document.getElementById=function(id){return(document.layers[id]);}; }

function OpenWin(sFileName,wwidth,wheight,window_name,bScroll,bResizable,locz)
 {
  if (window_name=='') { window_name='justawindow'; }
  if (wwidth=='') { wwidth=600; }
  if (wheight=='') { wheight=700; }
  if ((bScroll=='' )||(bScroll=='yes')) { bScroll='yes'; }
  if (bResizable=='') { bResizable='no'; }
  else if (bResizable=='yes') { bResizable=1; }
  var dlgOptions='';
  if ((locz)&&(locz!='dialog'))
   { yy=0; xx=0; }
  else
   {
    if (locz=='dialog') { dlgOptions=',dependent=yes,dialog=yes,minimizable=no,modal=yes,alwaysRaised=yes'; }
    ww=screen.width;
    hh=screen.height;
    if(wwidth>ww) { xx=0; } else { xx=Math.round((ww-wwidth)/2)-5; }
    if(wheight>hh) { yy=0; } else { yy=Math.round((hh-wheight)/2)-15; }
    if (yy<0) { yy=0; }
    if (xx<0) { xx=0; }
   }
  options='location=no, toolbar=no, status=no, left='+xx+', top='+yy+', menubar=no, height='+wheight+', width='+wwidth+', scrollbars ='+bScroll+', resizable='+bResizable+''+dlgOptions;
  file=sFileName;
  return(window.open(file,window_name,options));
 }
function numberFormat(n)
 {
  var p,s, nn='';
  n=''+n;
  if (n.indexOf('.')!=-1) { p=n.substring(0,n.indexOf('.')); s=n.substring(n.indexOf('.')+1, n.indexOf('.')+3); }
  else { p=n; s=0; }
  if (p.length<4) { if ((s!=0)&&(s.length==1)) { n+='0'; } return(n); }
  for (var j=p.length-1;j>=0;j--) { if (((p.length-1-j)%3==0)&&(j<p.length-1)) { nn=p.substring(j, j+1)+','+nn; } else { nn=p.substring(j, j+1)+nn; } }
  if (s!=0) { nn+='.'+s; if (s.length==1) { nn+='0'; } }
  return(nn);
 }
function searchFldValidation(fldID,minchr)
 {
  var ds=document.getElementById(fldID);
  if (! minchr) { minchr=2; }
  if ((! ds)||(ds.value.length<minchr)) { return(0); }
  else { return(1) ;}
 }
function fldValidation(required)
 {
  if (! required) { return(true); }
  var sendToFriend=0, toEmailFldName='';
  if (document.location.href.indexOf('&sendtofriend=1')>-1)
   {
    if (document.getElementById('Send_To_Email')) { sendToFriend=1; toEmailFldName='Send_To_Email'; }
    else if (document.getElementById('fldVal1')) { sendToFriend=1; toEmailFldName='fldVal1'; }
   }
  for (var i in required)
   {
    if (! i) { continue; }
    var el=document.getElementById(i);
    if ((! el)&&(document.getElementById(i+'_1')))
     {
      var j=1, fChecked=0;
      el=document.getElementById(i+'_'+j);
      while ((el)&&(fChecked==0))
       {
        if (el.checked) { fChecked=1; }
	j++;
	el=document.getElementById(i+'_'+j);
       }
      if (fChecked==0)
       { alert(required[i]); return(false); }
      continue;
     }
    else if (! el) { continue; }
    var val=el.value.replace(/[ \t]/g, '');
    if (! val)
     {
      alert(required[i]);
      try { el.focus(); }
      catch(err) { }
      return(false);
     }
    if ((el.name=='email')||((sendToFriend)&&((el.name==toEmailFldName)||(el.name=='senderemail'))))
     {
      if ((el.value.indexOf('.')<1)||(el.value.indexOf('@')<1))
       {
        alert(required[i]);
	try { el.focus(); }
	catch(err) { }
        return(false);
       }
     }
   }
  return(true);
 }
 // recieves allowed extensions and checks if the file is one of them:
// ex: onchange="if (!fileValidate(this.value,['zip'])) {fileErrMsg(['zip']); this.value='';"
function fileValidate(value,extensions) {
	if(extensions.length > 0){
		var l=0;
		var rexp = "\.(" + extensions.join("|") + ")";
		re = new RegExp(rexp,"i");
		return re.test(value);
	}
	else{
		return false;
	}
}
function fileErrMsg(extensions){
	var allowedTypes = extensions.join(' or .');
	alert('Format incorrect - allowed extentions: .' + allowedTypes);
}
function getFileName(path)
 {
  var len, i, vb;
  len=path.length;
  for (var i=len;i>0;i--)
   {
    vb=path.substring(i,i+1);
    if ((vb=="/")||(vb=="\\"))
     { return(path.substring(i+1,len)); }
   }
 }
function updateLinkedSelects(id, ar, selected, valAr)
 {
  var i, j=0, sel=document.getElementById(id);
  if (! sel) { return; }
  for (i=sel.options.length;i>0;i--) { sel.options[i]=null; }
  for (i=0;i<ar.length;i++)
   {
    if (ar[i])
     {
      if ((valAr)&&(valAr[ar[i]]))
       { sel.options[++j]=new Option(valAr[ar[i]], ar[i]); }
      else
       { sel.options[++j]=new Option(ar[i], ar[i]); }
     }
   }
  if (! selected) { selected=0; }
  if (! sel.options) { return; }
  if (! sel.options[selected]) { return; }
  sel.options[selected].selected=true;
 }
function addImageFlashEffect(imgid, flashsrc)
 {
  var d=document.getElementById(imgid);
  if (! d) { return; }
  var fd=document.createElement("div");
  var w=parseInt(d.offsetWidth);
  var h=parseInt(d.offsetHeight);
  fd.id=imgid+'flashObjLocator';
  fd.style.position='absolute';
  fd.style.top=d.style.top;
  fd.style.left=d.style.left;
  fd.style.zIndex='100';
  fd.style.width=w+'px';
  fd.style.height=h+'px';
  d.parentNode.insertBefore(fd, d);
  swfobject.embedSWF(flashsrc, imgid+'flashObjLocator', w, h, '9.0.0.0', 'expressinstall.swf', {}, {'quality':'high','wmode':'transparent'}, {'style':'position:absolute;zIndex:100;top:'+parseInt(d.style.top)+'left:'+parseInt(d.style.left)+';'});
 }
function addToDocOnload(data)
 { if (data) { docOnLoadBuf+='\n'+data+'\n'; } }
function docOnloadRunBuf()
 { if (docOnLoadBuf) { eval(docOnLoadBuf); } }
var imageTagId;
//this function is part of calling public image gallery 
//from another domain.
//the assignment of imageTagId is done before opening the gallery window 
function setImageUrl(imageUrl)
{
 // handle the returned image URL
 var imgUrl = document.getElementById(imageTagId);
 imgUrl.value = imageUrl;
} 
var fldReqs, fldReqsSec, fldReqsSecKey;
var docOnLoadBuf='';
if (window.addEventListener) { window.addEventListener("load", docOnloadRunBuf, false); }
else { window.attachEvent("onload", docOnloadRunBuf); }
window.focus();

