require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.contact.deleteMany();
  await prisma.job.deleteMany();
  await prisma.news.deleteMany();

  // Seed News
  await prisma.news.createMany({
    data: [
      {
        title: "Vinacomin vượt kế hoạch sản lượng than quý I năm 2026, đạt 12,5 triệu tấn",
        slug: "vinacomin-vuot-ke-hoach-quy-1-2026",
        excerpt: "Tập đoàn công bố kết quả sản xuất quý I/2026 với sản lượng than đạt 12,5 triệu tấn, vượt 8% so với kế hoạch đề ra.",
        content: "Tập đoàn Công nghiệp Than – Khoáng sản Việt Nam (Vinacomin) vừa công bố kết quả sản xuất kinh doanh quý I năm 2026 với những con số ấn tượng. Sản lượng than khai thác đạt 12,5 triệu tấn, vượt 8% so với kế hoạch đề ra và tăng 5,2% so với cùng kỳ năm 2025.",
        category: "Sản xuất",
        image: "https://picsum.photos/seed/news-1/600/400",
        date: "15/06/2026",
      },
      {
        title: "Vinacomin khởi công dự án khai thác mỏ than Khe Chàm IV với tổng vốn 4.200 tỷ đồng",
        slug: "khoi-cong-mo-than-khe-cham-iv",
        excerpt: "Dự án mỏ than Khe Chàm IV được kỳ vọng đóng góp thêm 2 triệu tấn than mỗi năm cho tổng sản lượng của tập đoàn.",
        content: "Ngày 12/06/2026, Vinacomin chính thức khởi công dự án khai thác mỏ than Khe Chàm IV tại Quảng Ninh với tổng mức đầu tư 4.200 tỷ đồng. Dự án dự kiến hoàn thành vào năm 2028.",
        category: "Đầu tư",
        image: "https://picsum.photos/seed/news-2/600/400",
        date: "12/06/2026",
      },
      {
        title: "Tập đoàn triển khai chương trình trồng rừng phủ xanh 1.500 ha vùng khai thác",
        slug: "chuong-trinh-trong-rung-1500ha",
        excerpt: "Chương trình là một phần trong chiến lược phát triển bền vững và cam kết bảo vệ môi trường của Vinacomin.",
        content: "Vinacomin triển khai chương trình trồng rừng quy mô lớn nhằm phục hồi hệ sinh thái tại các vùng khai thác khoáng sản. Mục tiêu phủ xanh 1.500 ha trong năm 2026.",
        category: "Bền vững",
        image: "https://picsum.photos/seed/news-3/600/400",
        date: "10/06/2026",
      },
      {
        title: "Vinacomin tổ chức hội nghị biểu dương 500 chiến sĩ thi đua toàn quốc năm 2026",
        slug: "hoi-nghi-bieu-duong-500-chien-si",
        excerpt: "Đây là sự kiện thường niên nhằm ghi nhận và tôn vinh những cá nhân xuất sắc trong toàn hệ thống tập đoàn.",
        content: "Hội nghị biểu dương chiến sĩ thi đua 2026 quy tụ hơn 500 cá nhân xuất sắc từ tất cả các đơn vị thành viên trong hệ thống Vinacomin.",
        category: "Nhân sự",
        image: "https://picsum.photos/seed/news-4/600/400",
        date: "08/06/2026",
      },
      {
        title: "Ký kết hợp tác chiến lược với tập đoàn năng lượng Hàn Quốc POSCO Energy",
        slug: "ky-ket-hop-tac-posco-energy",
        excerpt: "Thỏa thuận hợp tác bao gồm các dự án điện lực, năng lượng tái tạo và chuyển giao công nghệ khai thác tiên tiến.",
        content: "Vinacomin và POSCO Energy đã ký kết Biên bản ghi nhớ hợp tác chiến lược trong lĩnh vực năng lượng và công nghệ khai thác tiên tiến tại Seoul ngày 05/06/2026.",
        category: "Hợp tác",
        image: "https://picsum.photos/seed/news-5/600/400",
        date: "05/06/2026",
      },
      {
        title: "Sản lượng khai thác khoáng sản tăng trưởng 12% trong 5 tháng đầu năm 2026",
        slug: "san-luong-khoang-san-tang-truong",
        excerpt: "Nhờ đầu tư vào công nghệ và mở rộng năng lực khai thác, sản lượng khoáng sản đạt mức tăng trưởng ấn tượng.",
        content: "Trong 5 tháng đầu năm 2026, sản lượng khai thác khoáng sản của Vinacomin đạt mức tăng trưởng 12% so với cùng kỳ năm 2025, nhờ đầu tư đúng hướng vào công nghệ hiện đại.",
        category: "Sản xuất",
        image: "https://picsum.photos/seed/news-6/600/400",
        date: "02/06/2026",
      },
    ],
  });

  // Seed Jobs
  await prisma.job.createMany({
    data: [
      { title: "Kỹ sư Khai thác Mỏ", department: "Kỹ thuật", location: "Quảng Ninh", type: "Toàn thời gian", level: "Trung cấp", deadline: "30/07/2026" },
      { title: "Chuyên viên Tài chính – Kế toán", department: "Tài chính", location: "Hà Nội", type: "Toàn thời gian", level: "Cao cấp", deadline: "25/07/2026" },
      { title: "Kỹ sư Môi trường", department: "Môi trường", location: "Quảng Ninh", type: "Toàn thời gian", level: "Trung cấp", deadline: "20/07/2026" },
      { title: "Chuyên viên IT – Hạ tầng", department: "Công nghệ", location: "Hà Nội", type: "Toàn thời gian", level: "Trung cấp", deadline: "15/07/2026" },
      { title: "Trưởng phòng Kinh doanh", department: "Kinh doanh", location: "Hà Nội", type: "Toàn thời gian", level: "Quản lý", deadline: "10/07/2026" },
      { title: "Kỹ sư An toàn Lao động", department: "An toàn", location: "Quảng Ninh", type: "Toàn thời gian", level: "Trung cấp", deadline: "05/07/2026" },
    ],
  });

  console.log("Seed data inserted successfully");
  console.log(`  News: 6 articles`);
  console.log(`  Jobs: 6 positions`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
