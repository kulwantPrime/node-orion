git checkout master
npm install
./node_modules/mocha/bin/mocha
grunt
git checkout test
git add build.zip
git commit -m "jenkins build push"
git push github test
git rm build.zip
git commit -m "Local: jenkins build delete"