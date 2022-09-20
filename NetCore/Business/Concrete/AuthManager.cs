using Business.Abstract;
using Core.Utilities.Hashing;
using Core.Utilities.Security.JWT;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class AuthManager : IAuthService
    {
        private readonly IUserDal _userDal;
        private readonly ITokenHelper _tokenHelper;

        public AuthManager(IUserDal userDal, ITokenHelper tokenHelper)
        {
            _userDal = userDal;
            _tokenHelper = tokenHelper;
        }

        public AccessToken CreateAccessToken()
        {
            var accessToken = _tokenHelper.CreateToken();
            return accessToken;
        }

        public void Login(AuthDto authDto)
        {
            var user = _userDal.Get(x => x.UserName == authDto.UserName);
            if (user == null)
            {
                throw new ApplicationException("Lütfen Giriş Yapmayı Denemeyiniz. Giriş Sadece Admin içindir");
            }
            var check = HashingHelper.VerifyPasswordHash(authDto.Password, user.PasswordHash, user.PasswordSalt);
            if (!check)
            {
                throw new ApplicationException("Kullanıcı Adını Buldun.Lütfen Şifre için uğraşma!");
            }
            
        }

        public void Register(AuthDto authDto)
        {
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(authDto.Password, out passwordHash, out passwordSalt);

            var user = new User
            {
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                UserName = authDto.UserName
            };
            _userDal.Add(user);
        }
    }
}
