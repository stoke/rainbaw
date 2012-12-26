var expect = require('expect.js');

var rainbaw = require('../rainbaw');

describe('rainbaw.js', function() {
  it('should convert correctly', function() {
    var r1 = rainbaw({r: 123, g: 0x23, b: 0xff});
    
    expect(r1.hex).to.be('7b23ff');
    expect(r1.h).to.be(264);
    expect(r1.s).to.be(86);
    expect(r1.v).to.be(100);
  });
});
