const { assert } = import('chai');
const User = require('./auth');

describe('User model', () => {
  describe('authenticate', () => {
    it('should redirect to login if no user is found', async () => {
      const req = {};
      const res = {
        redirect: (url) => {
          assert.equal(url, '/views/login');
        }
      };
      const next = sinon.spy();
      await User.authenticate(req, res, next);
      assert.isTrue(next.notCalled);
    });

    it('should call next if user is found and is an admin', async () => {
      const req = {
        session: {
          user: {
            role: 'admin'
          }
        }
      };
      const res = {};
      const next = sinon.spy();
      await User.authenticate(req, res, next);
      assert.isTrue(next.calledOnce);
    });

    it('should redirect to login if user is found and is not an admin', async () => {
      const req = {
        session: {
          user: {
            role: 'user'
          }
        }
      };
      const res = {
        redirect: (url) => {
          assert.equal(url, '/views/login');
        }
      };
      const next = sinon.spy();
      await User.authenticate(req, res, next);
      assert.isTrue(next.notCalled);
    });
  });
});