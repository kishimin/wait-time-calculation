using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}