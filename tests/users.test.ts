import lambdaTester from 'lambda-tester';
import { expect } from 'chai';
import { findOne, find, create, update, deleteOne } from '../app/handler';
import * as usersMock from './users.mock';
import { users as UsersModel } from '../app/model/users';
import sinon from 'sinon';

describe('FindOne [GET]', () => {
  it('success', () => {
    try {
      const s = sinon
        .mock(UsersModel);

      s.expects('findOne')
        .atLeast(1)
        .atMost(3)
        .resolves(usersMock.findOne);

      return lambdaTester(findOne)
      .event({ pathParameters: { id: 25768396 } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.verify();
        s.restore();
      });
    } catch (err) {
      console.log(err);
    }
  });

  it('error', () => {
    try {
      const s = sinon
        .mock(UsersModel);

      s.expects('findOne')
        .rejects(usersMock.castError);

      return lambdaTester(findOne)
      .event({ pathParameters: { id: 25768396 } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
    } catch (err) {
      console.log(err);
    }
  });
});

describe('Find [GET]', () => {
  it('success', () => {
    const s = sinon
      .mock(UsersModel);

    s.expects('find')
      .resolves(usersMock.find);

    return lambdaTester(find)
    .event({})
    .expectResult((result: any) => {
      expect(result.statusCode).to.equal(200);
      const body = JSON.parse(result.body);
      expect(body.code).to.equal(0);
      s.restore();
    });
  });

  it('error', () => {
    const s = sinon
      .mock(UsersModel);

    s.expects('find').rejects(usersMock.findError);

    return lambdaTester(find)
    .event({})
    .expectResult((result: any) => {
      expect(result.statusCode).to.equal(200);
      const body = JSON.parse(result.body);
      expect(body.code).to.equal(1000);
      s.restore();
    });
  });
});

describe('Create [POST]', () => {
  it('success', () => {
    const s = sinon
      .mock(UsersModel);

    s.expects('create').resolves(usersMock.create);

    return lambdaTester(create)
      .event({ body: JSON.stringify({
        name: 'Node.js：来一打 C++ 扩展',
        id: 30247892,
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });

  it('error', () => {
    const s = sinon
      .mock(UsersModel);

    s.expects('create').rejects(usersMock.createError);

    return lambdaTester(create)
      .event({ body: JSON.stringify({
        name: 'Node.js：来一打 C++ 扩展',
        id: 30247892,
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
  });
});

describe('Update [PUT]', () => {
  it('success', () => {
    const s = sinon
      .mock(UsersModel);

    s.expects('findOneAndUpdate').resolves(usersMock.update);

    return lambdaTester(update)
      .event({ pathParameters: { id: 30247892 }, body: JSON.stringify({
        name: 'Node.js：来一打 C++ 扩展',
        description: '阅读《Node.js：来一打 C++ 扩展》，相当于同时学习Chrome V8 开发、libuv 开发以及 Node.js 的原生 C++ 扩展开发知识，非常值得！',
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });

  it('error', () => {
    const s = sinon
      .mock(UsersModel);

    s.expects('findOneAndUpdate').rejects(usersMock.castError);

    return lambdaTester(update)
      .event({  pathParameters: { id: '30247892_' }, body: JSON.stringify({
        name: 'Node.js：来一打 C++ 扩展',
        description: '阅读《Node.js：来一打 C++ 扩展》，相当于同时学习Chrome V8 开发、libuv 开发以及 Node.js 的原生 C++ 扩展开发知识，非常值得！',
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
  });
});

describe('DeleteOne [Delete]', () => {
  it('success', () => {
    const s = sinon
      .mock(UsersModel);

    s.expects('deleteOne').resolves(usersMock.deleteOne);

    return lambdaTester(deleteOne)
      .event({  pathParameters: { id: 30247892 } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });

  it('deletedCount === 0', () => {
    const s = sinon
      .mock(UsersModel);

    s.expects('deleteOne').resolves(usersMock.deletedCount);

    return lambdaTester(deleteOne)
      .event({ pathParameters: { id: 30247892 } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1010);
        s.restore();
      });
  });

  it('error', () => {
    const s = sinon
      .mock(UsersModel);

    s.expects('deleteOne').rejects(usersMock.castError);

    return lambdaTester(deleteOne)
      .event({ pathParameters: { id: '30247892_' } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
  });
});
