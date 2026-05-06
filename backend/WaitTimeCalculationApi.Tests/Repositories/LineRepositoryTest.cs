using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Repositories;
using Xunit;

namespace WaitTimeCalculationApi.Tests.Repositories
{
    public class LineRepositoryTest
    {
        [Fact]
        public void 行列の一覧が取得できる()
        {
            // Given
            // ApplicationDbContextをモック
            // DBに保存する内容をモック

            // When
            // GetAllAsync()を使用

            // Then
            // モックしたDBに保存した内容が取得できることを確認
            // リストの大きさが等しいことも確認
        }
    }
}