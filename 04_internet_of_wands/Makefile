

dev-static: dev-vars.json client/*
	cp -r client dev-static
	j2 -f json client/index.html dev-vars.json > dev-static/index.html
