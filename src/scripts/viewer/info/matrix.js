module.exports = isCompatible;

var aliases = {
   "Unlicense":"public-domain",
   "WTFPL":"public-domain",
   "CC0-1.0":"public-domain",
   "0BSD":"public-domain",
   "Other":"public-domain",
   "Ruby":"public-domain",
   "Zlib":"zlib/libpng",
   "Libpng":"zlib/libpng",
   "MIT":"MIT/X11",
   "MIT-0":"MIT/X11",
   "X11":"MIT/X11",
   "ISC":"MIT/X11",
   "ICU":"MIT/X11",
   "Beerware":"MIT/X11",
   "AFL-3.0":"AFL-3.0",
   "Apache-2.0":"Apache-2.0",
   "BSD-3-Clause":"3-clause / New BSD",
   "BSD-2-Clause":"2-clause / Free BSD",
   "MPL-1.1":"MPL-1.1",
   "MPL-1.1+":"MPL-1.1+",
   "MPL-2.0":"MPL-2.0",
   "CDDL-1.0":"CDDL-1.0",
   "LGPL-2.1":"LGPL-2.1",
   "LGPL-2.1-only":"LGPL-2.1",
   "LGPL-2.1+":"LGPL-2.1+",
   "LGPL-2.1-or-later":"LGPL-2.1+",
   "LGPL-3.0-only":"LGPL-3.0 or LGPL-3.0+",
   "LGPL-3.0-or-later":"LGPL-3.0 or LGPL-3.0+",
   "LGPL-3.0":"LGPL-3.0 or LGPL-3.0+",
   "LGPL-3.0+":"LGPL-3.0 or LGPL-3.0+",
   "OSL-3.0":"OSL-3.0",
   "GPL-2.0":"GPL-2.0",
   "GPL-2.0-only":"GPL-2.0",
   "GPL-2.0+":"GPL-2.0+",
   "GPL-2.0-or-later":"GPL-2.0+",
   "GPL-3.0-only":"GPL-3.0 or GPL-3.0+",
   "GPL-3.0-or-later":"GPL-3.0 or GPL-3.0+",
   "GPL-3.0":"GPL-3.0 or GPL-3.0+",
   "GPL-3.0+":"GPL-3.0 or GPL-3.0+",
   "AGPL-3.0":"AGPL-3.0",
   "AGPL-3.0-only":"AGPL-3.0",
   "AGPL-1.0+":"AGPL-1.0+",
   "AGPL-1.0-or-later":"AGPL-1.0+"
};

var matrix = {
   "public-domain":{
      "public-domain":true,
      "zlib/libpng":"Exception",
      "MIT/X11":"Exception",
      "AFL-3.0":"Exception",
      "Apache-2.0":"Exception",
      "3-clause / New BSD":"Exception",
      "2-clause / Free BSD":"Exception",
      "MPL-1.1":"Exception",
      "MPL-1.1+":"Exception",
      "MPL-2.0":"Exception",
      "CDDL-1.0":"Exception",
      "LGPL-2.1":"Exception",
      "LGPL-2.1+":"Exception",
      "LGPL-3.0 or LGPL-3.0+":"Exception",
      "OSL-3.0":"Exception",
      "GPL-2.0":"Exception",
      "GPL-2.0+":"Exception",
      "GPL-3.0 or GPL-3.0+":"Exception",
      "AGPL-3.0":"Exception",
      "AGPL-1.0+":"Exception"
   },
   "MIT/X11":{
      "3-clause / New BSD":true,
      "2-clause / Free BSD":true,
      "MIT/X11":true,
      "Apache-2.0":true,
      "MPL-2.0":true,
      "AFL-3.0":true,
      "LGPL-3.0 or LGPL-3.0+":true,
      "LGPL-2.1+":true,
      "OSL-3.0":true,
      "GPL-3.0 or GPL-3.0+":true,
      "LGPL-2.1":true,
      "GPL-2.0+":true,
      "AGPL-3.0":true,
      "GPL-2.0":true
   },
   "2-clause / Free BSD":{
      "3-clause / New BSD":true,
      "2-clause / Free BSD":true,
      "Apache-2.0":true,
      "MPL-2.0":true,
      "AFL-3.0":true,
      "LGPL-3.0 or LGPL-3.0+":true,
      "LGPL-2.1+":true,
      "OSL-3.0":true,
      "GPL-3.0 or GPL-3.0+":true,
      "LGPL-2.1":true,
      "GPL-2.0+":true,
      "AGPL-3.0":true,
      "GPL-2.0":true
   },
   "3-clause / New BSD":{
      "Apache-2.0":true,
      "MPL-2.0":true,
      "3-clause / New BSD":true,
      "AFL-3.0":true,
      "LGPL-3.0 or LGPL-3.0+":true,
      "LGPL-2.1+":true,
      "OSL-3.0":true,
      "GPL-3.0 or GPL-3.0+":true,
      "LGPL-2.1":true,
      "GPL-2.0+":true,
      "AGPL-3.0":true,
      "GPL-2.0":true
   },
   "zlib/libpng":{
      "Apache-2.0":true,
      "zlib/libpng":true,
      "AFL-3.0":true,
      "LGPL-3.0 or LGPL-3.0+":true,
      "MPL-2.0":true,
      "OSL-3.0":true,
      "GPL-3.0 or GPL-3.0+":true,
      "AGPL-3.0":true
   },
   "Apache-2.0":{
      "AFL-3.0":true,
      "LGPL-3.0 or LGPL-3.0+":true,
      "MPL-2.0":true,
      "Apache-2.0":true,
      "OSL-3.0":true,
      "GPL-3.0 or GPL-3.0+":true,
      "AGPL-3.0":true
   },
   "AFL-3.0":{
      "OSL-3.0":true,
      "AFL-3.0":true
   },
   "MPL-1.1":{
      "MPL-2.0":true,
      "CDDL-1.0":true,
      "MPL-1.1":true
   },
   "MPL-1.1+":{
      "MPL-1.1":true,
      "CDDL-1.0":true,
      "MPL-2.0":true,
      "MPL-1.1+":true,
      "LGPL-2.1+":true,
      "LGPL-3.0 or LGPL-3.0+":true,
      "LGPL-2.1":true,
      "GPL-2.0+":true,
      "GPL-3.0 or GPL-3.0+":true,
      "GPL-2.0":true,
      "AGPL-3.0":true
   },
   "MPL-2.0":{
      "LGPL-2.1+":true,
      "MPL-2.0":true,
      "LGPL-3.0 or LGPL-3.0+":true,
      "LGPL-2.1":true,
      "GPL-2.0+":true,
      "GPL-3.0 or GPL-3.0+":true,
      "GPL-2.0":true,
      "AGPL-3.0":true
   },
   "LGPL-2.1+":{
      "LGPL-3.0 or LGPL-3.0+":true,
      "LGPL-2.1":true,
      "GPL-2.0+":true,
      "public-domain":"Exception",
      "MIT/X11":"Exception",
      "3-clause / New BSD":"Exception",
      "2-clause / Free BSD":"Exception",
      "Apache-2.0":"Exception",
      "zlib/libpng":"Exception",
      "AFL-3.0":"Exception",
      "MPL-1.1":"Exception",
      "MPL-1.1+":"Exception",
      "MPL-2.0":"Exception",
      "CDDL-1.0":"Exception",
      "LGPL-2.1+":true,
      "GPL-3.0 or GPL-3.0+":true,
      "GPL-2.0":true,
      "AGPL-3.0":true
   },
   "LGPL-3.0 or LGPL-3.0+":{
      "GPL-3.0 or GPL-3.0+":true,
      "public-domain":"Exception",
      "MIT/X11":"Exception",
      "3-clause / New BSD":"Exception",
      "2-clause / Free BSD":"Exception",
      "Apache-2.0":"Exception",
      "zlib/libpng":"Exception",
      "AFL-3.0":"Exception",
      "MPL-1.1":"Exception",
      "MPL-1.1+":"Exception",
      "MPL-2.0":"Exception",
      "CDDL-1.0":"Exception",
      "LGPL-3.0 or LGPL-3.0+":true,
      "AGPL-3.0":true
   },
   "LGPL-2.1":{
      "GPL-2.0":true,
      "GPL-2.0+":true,
      "public-domain":"Exception",
      "MIT/X11":"Exception",
      "3-clause / New BSD":"Exception",
      "2-clause / Free BSD":"Exception",
      "Apache-2.0":"Exception",
      "zlib/libpng":"Exception",
      "AFL-3.0":"Exception",
      "MPL-1.1":"Exception",
      "MPL-1.1+":"Exception",
      "MPL-2.0":"Exception",
      "CDDL-1.0":"Exception",
      "LGPL-2.1":true,
      "GPL-3.0 or GPL-3.0+":true,
      "AGPL-3.0":true
   },
   "GPL-2.0+":{
      "GPL-2.0":true,
      "GPL-3.0 or GPL-3.0+":true,
      "GPL-2.0+":true,
      "AGPL-3.0":true
   },
   "GPL-3.0 or GPL-3.0+":{
      "AGPL-3.0":true,
      "GPL-3.0 or GPL-3.0+":true
   },
   "AGPL-1.0+":{
      "AGPL-3.0":true,
      "AGPL-1.0+":true
   },
   "CDDL-1.0":{
      "CDDL-1.0":true
   },
   "OSL-3.0":{
      "OSL-3.0":true
   },
   "GPL-2.0":{
      "GPL-2.0":true
   },
   "AGPL-3.0":{
      "AGPL-3.0":true
   }
};

function isCompatible(dependency_licence, derivative_license) {

	// Get the unique identifier for the aliases
    let dependency_node = aliases[dependency_licence];
    let derivative_node = aliases[derivative_license];

    // If one of the aliases is not known
    if(dependency_node == undefined || derivative_node == undefined) {
    	return "Unknown";
    }

    // If the 2 aliases refer to the same license (e.g., "MIT" and "MIT-0")
    if(dependency_node == derivative_node) {
    	return true;
    }

    return matrix[dependency_node][derivative_node] != undefined;

}
