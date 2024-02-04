const bcrypt = require('bcrypt');

for (let i = 1; i <= 10; i++) {
	bcrypt.hash('th5kaSodR6cr*ZoyI8ti', 10, (err, hash) => {
		console.log(`insert into user values()`);
	});
}