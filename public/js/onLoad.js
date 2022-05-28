let onLoadA = (e) => {
	url=e.href;setTimeout('location.href=url',700);e.href='javascript:void(0)';
}