import { Test } from '@nestjs/testing';
import { authService } from './auth.service';
import { UsersService } from './users.service';
import { user } from './user.entity';

describe('authService', () => {
  const users: user[] = [];
  let service: authService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email) => {
        const user = users.filter((user) => user.email === email);
        return Promise.resolve(user);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email: email,
          password: password,
        } as user;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        authService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(authService);
  });
  it('we can define an instence of auth service ', async () => {
    expect(service).toBeDefined();
  });

  it('sineup a user', async () => {
    const user = await service.sinup('amgad@gmail.com', '323412');
    expect(user.password).not.toEqual('323412');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throw  if user exist', async () => {
    await service.sinup('amgad@gmawwil.com', '323412');
    try {
      await service.sinup('amgad@gmawwil.com', '323412');
    } catch (err) {}
  });

  it('sinin user', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: 'amgad@gmail.com',
          password:
            'f220e04864c8d3c0.07ba59b0e82afbe1b4e92db73484673a72937dbc2b1f3e4a49d3abe2de8cefeebbaa3afd0912b55e',
        },
      ]);
    await service.sinin('emai324234n@gmail.com', '23423');
  });

  it('throw if password is invalid ', async () => {
    try {
      await service.sinup("amg32412a222d@gmail.com'", '2334212344');
      const user = await service.sinin(
        "amg32412a222d@gmail.com'",
        '234434212344',
      );

      expect(user).toBeUndefined;
    } catch (err) {
      expect(user).toBeUndefined;
    }
    expect(user).toBeUndefined;
  });
});
