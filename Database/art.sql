-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2024 at 10:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `art`
--

-- --------------------------------------------------------

--
-- Table structure for table `artwork`
--

CREATE TABLE `artwork` (
  `id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT 0,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `art` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `sales` int(11) NOT NULL DEFAULT 0,
  `total_sales` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artwork`
--

INSERT INTO `artwork` (`id`, `status`, `title`, `description`, `category`, `price`, `art`, `user_id`, `artist`, `deleted`, `sales`, `total_sales`) VALUES
(27, 1, 'Queen Saba', 'd', 'Concept Art', 4000.00, '1712862338531_saba reco.png', 27, 'Good', 0, 1, 1),
(31, 1, 'The Tree Of Life', 'he Tree of Life is a common idea in many cultures, representing the source of life, a connection between all lives, or the cycle of life and death. In Celtic culture, the Tree of Life symbolizes the afterlife, connection between the earth and heaven, and ancestral roots', 'Concept Art', 877.00, '1712902984959_@Wallpapers (165).jpg', 28, 'Ahoye', 0, 0, 0),
(35, 1, 'Adem', 'the First man Adem in the place where he was Created', 'Nature', 800.00, '1714410785572_keshu-soman-3op9gkZbHyw-unsplash.jpg', 28, 'Ahoye', 0, 0, 0),
(36, 1, 'CarCity', 'Something dramatic', 'Cyberpunk', 700.00, '1714410834089_skiegraphic-studio-ferrari-cyber1280.jpg', 28, 'Ahoye', 0, 0, 0),
(37, 1, 'Going Home', 'Going Home from some ware from a deferent era to the ultimate universe ', 'Cyberpunk', 700.00, '1714727622350_skiegraphic-studio-skie-gr.jpg', 28, 'Ahoye', 0, 0, 0),
(38, 1, 'wonderer', 'a feeling of beang lost and in a diferent order hanging by a tread thinkink whats going on in my life', 'Horror', 899.00, '1714738937874_455106654_291523.jpg', 28, 'Ahoye', 0, 0, 0),
(39, 1, 'stardust', 'a place where every dest tern in to ashes where every thing lose hope gain hope', 'Sci-Fi', 799.00, '1714739049734_IMG_20190529_104324_176.jpg', 28, 'Ahoye', 0, 0, 0),
(40, 1, 'Woman in Raige', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible. bold brushstrokes to intricate linework', 'Character Design', 700.00, '1714836986668_318738905_1823829077984500_1222296522189796693_n.webp', 28, 'Ahoye', 0, 0, 0),
(41, 1, 'Fire away', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Character Design', 700.00, '1714837049046_341935154_613597883983273_7790930489369142139_n.webp', 28, 'Ahoye', 0, 0, 0),
(42, 1, 'the many faces', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Surreal', 800.00, '1714837101774_330231567_987391262249526_954417160659756166_n.jpg', 28, 'Ahoye', 0, 0, 0),
(43, 1, 'Family tree', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Character Design', 800.00, '1714837157421_338362103_1308292683069912_1773933330122562885_n.jpg', 28, 'Ahoye', 0, 0, 0),
(44, 1, 'the living', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Character Design', 900.00, '1714837208978_337720854_230478082882288_210002876303374303_n.jpg', 28, 'Ahoye', 0, 0, 0),
(45, 1, 'After hours', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Horror', 788.00, '1714837253171_333380514_1394830501281598_6367105409012966149_n.webp', 28, 'Ahoye', 0, 0, 0),
(46, 1, 'day drinking', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Anime/Manga', 900.00, '1714837300228_287111693_155618853753803_8794439018073929091_n.webp', 28, 'Ahoye', 0, 0, 0),
(47, 1, 'flud', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Fantasy', 799.00, '1714837342636_343162830_1182511779812295_2826539259818255345_n.webp', 28, 'Ahoye', 0, 0, 0),
(48, 1, 'Mimi Buna', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Concept Art', 500.00, '1714837389044_348708139_1031619991156197_951207633660922765_n.webp', 28, 'Ahoye', 0, 0, 0),
(49, 1, 'yeshi sfet', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible. ', 'Concept Art', 889.00, '1714837427631_346696581_128046803575444_6836517128470278635_n.webp', 28, 'Ahoye', 0, 0, 0),
(50, 1, 'dreams', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Fan Art', 899.00, '1714837475265_367371909_325924549786706_4289092054149987209_n.webp', 28, 'Ahoye', 0, 0, 0),
(52, 1, 'Ages', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible. ', 'Fan Art', 500.00, '1714837906461_344810070_1463157737422541_878692669154287974_n.webp', 40, 'Assbe', 0, 0, 0),
(53, 1, 'Final days', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Pop Art', 1000.00, '1714837958777_260178324_950046865721941_3274812370901606993_n.jpg', 40, 'Assbe', 0, 0, 0),
(54, 1, 'Passion Play', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible. ', 'Pop Art', 998.00, '1714841836314_283382046_821805138781252_7343035709742331757_n.jpg', 40, 'Assbe', 0, 0, 0),
(55, 1, 'Lit Trap', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Horror', 699.00, '1714841878909_290510852_182425497540438_7672489502922982345_n.jpg', 40, 'Assbe', 0, 0, 0),
(56, 1, 'Sparta', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Fan Art', 900.00, '1714841927812_329318357_586966322858660_666138719207041145_n.jpg', 40, 'Assbe', 0, 0, 0),
(57, 1, 'Elven', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Fan Art', 766.00, '1714841974623_375845202_824859362464125_7726376064314329020_n.jpg', 40, 'Assbe', 0, 0, 0),
(58, 1, 'The creator', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible. ', 'Anime/Manga', 900.00, '1714842017993_326299246_5808917479196032_7519656348076592758_n.jpg', 40, 'Assbe', 0, 0, 0),
(59, 1, 'lost in Love', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangibleork', 'Pop Art', 888.00, '1714842060333_296896625_1230930634398219_1232680690876434877_n.jpg', 40, 'Assbe', 0, 0, 0),
(60, 1, 'The wlak', 'Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible.', 'Horror', 899.00, '1714842117412_293006893_455033993126370_4461824951855263961_n.jpg', 40, 'Assbe', 0, 0, 0),
(61, 1, 'Rome', 'this is rome', 'Nature', 200.00, '1715239428278_1711016245986_IMG_20190531_123926_213.jpg', 44, 'Robel', 0, 0, 0),
(64, 1, 'Man', 'this is art', 'Character Design', 200.00, '1715665071003_1712144763217_1710506669860_ego-2.jpg', 51, 'zema', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` int(11) NOT NULL,
  `art` varchar(255) NOT NULL,
  `art_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `art`, `art_id`, `user_id`, `created_at`) VALUES
(72, '', 22, 28, '2024-04-13 18:14:24'),
(93, '', 21, 27, '2024-04-18 06:33:44'),
(94, '', 31, 27, '2024-04-18 06:33:47'),
(97, '', 21, 40, '2024-04-26 13:32:55'),
(98, '', 21, 28, '2024-05-01 12:28:42'),
(103, '', 36, 46, '2024-05-09 17:34:26'),
(104, '', 34, 46, '2024-05-09 17:34:29'),
(105, '', 31, 51, '2024-05-14 05:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `art_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(10) NOT NULL,
  `size` varchar(10) NOT NULL,
  `art` varchar(255) NOT NULL,
  `art_title` varchar(100) NOT NULL,
  `seller_name` varchar(100) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`art_id`, `user_id`, `price`, `quantity`, `size`, `art`, `art_title`, `seller_name`, `id`) VALUES
(27, 45, 4000.00, 1, 'small', '1712862338531_saba reco.png', 'Queen Saba', 'Anberbir Niguse', 56),
(27, 51, 4000.00, 1, 'medium', '1712862338531_saba reco.png', 'Queen Saba', 'Anberbir Niguse', 61);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Abstract'),
(2, 'Animals'),
(3, 'Anime/Manga'),
(6, 'Character Design'),
(7, 'Concept Art'),
(8, 'Cyberpunk'),
(9, 'Fantasy'),
(10, 'Fan Art'),
(11, 'Graffiti'),
(12, 'Horror'),
(13, 'Minimalism'),
(14, 'Nature'),
(15, 'Pixel Art'),
(16, 'Pop Art'),
(17, 'Sci-Fi'),
(18, 'Steampunk'),
(19, 'Surreal');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `datetime`, `status`) VALUES
(40, 44, 'Congrats!, you are now a seller', '2024-05-09 10:21:25', 0),
(41, 44, 'Your art has been approved!', '2024-05-09 10:24:53', 0),
(42, 28, 'your art is not approved', '2024-05-09 20:49:12', 1),
(43, 27, 'your art is not approved', '2024-05-09 20:51:22', 1),
(44, 28, 'your art is not approved', '2024-05-09 20:53:37', 1),
(45, 44, 'your art is not approved', '2024-05-09 20:54:00', 0),
(46, 27, 'Your art has been approved!', '2024-05-09 20:56:59', 1),
(47, 28, 'your art is not approved', '2024-05-09 20:58:28', 1),
(48, 44, 'your art is not approved', '2024-05-09 21:00:34', 0),
(49, 44, 'your art is not approved', '2024-05-12 00:30:00', 0),
(50, 51, 'sorry! ,your not approved as a seller', '2024-05-12 12:05:33', 0),
(51, 51, 'sorry! ,your not approved as a seller', '2024-05-12 12:09:55', 0),
(52, 44, 'your art is not approved', '2024-05-13 21:40:32', 0),
(53, 51, 'Congrats!, you are now a seller', '2024-05-14 08:33:00', 0),
(54, 51, 'Your art has been approved!', '2024-05-14 08:38:31', 0),
(55, 51, 'Congrats!, you are now a seller', '2024-05-14 10:10:37', 0);

-- --------------------------------------------------------

--
-- Table structure for table `payment_detail`
--

CREATE TABLE `payment_detail` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `phone_no` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `location` varchar(20) NOT NULL,
  `data` text NOT NULL,
  `tx_ref` varchar(50) NOT NULL,
  `print_status` varchar(10) NOT NULL DEFAULT 'waiting',
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_detail`
--

INSERT INTO `payment_detail` (`id`, `user_id`, `fname`, `lname`, `phone_no`, `email`, `location`, `data`, `tx_ref`, `print_status`, `datetime`) VALUES
(77, 51, 'zema', 'kebede', '928445235', 'zema@gmail.com', 'Addis Abeba bole', '[{\"art_id\":27,\"user_id\":51,\"price\":4000,\"quantity\":1,\"size\":\"small\",\"art\":\"1712862338531_saba reco.png\",\"art_title\":\"Queen Saba\",\"seller_name\":\"Anberbir Niguse\",\"id\":60}]', 'TX-GL5YSNFZIZG6XBEXS9QN', 'delivered', '2024-05-12 06:27:56');

-- --------------------------------------------------------

--
-- Table structure for table `pending_user`
--

CREATE TABLE `pending_user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `verificationCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `print_price`
--

CREATE TABLE `print_price` (
  `id` int(11) NOT NULL,
  `size` varchar(10) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `print_price`
--

INSERT INTO `print_price` (`id`, `size`, `price`) VALUES
(1, 'small', 1000),
(2, 'medium', 1500),
(3, 'large', 2000);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `art_id` int(11) DEFAULT NULL,
  `rating` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `user_id`, `art_id`, `rating`) VALUES
(20, 44, 61, 3),
(22, 45, 27, 3),
(24, 44, 31, 5),
(25, 51, 27, 5);

-- --------------------------------------------------------

--
-- Table structure for table `reset_tokens`
--

CREATE TABLE `reset_tokens` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `token` varchar(50) NOT NULL,
  `expires` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `portfolio_link` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('buyer','seller','admin','branch') DEFAULT 'buyer',
  `avatar` varchar(500) NOT NULL DEFAULT '1713623076700_istockphoto-1300845620-612x612.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `avatar`) VALUES
(22, 'chala', 'chala@gmail.com', '$2b$10$25Znx6CMBvxVSoJQB5XrLus2SjYtjWZHNBawfCq.lBBYCrEKqBEfO', 'seller', ''),
(27, 'Anberbir Niguse', 'nvbjaje394@hacker.com.se', '$2b$10$FU8nTv3yOdTg68OGY0dha.2r0LXLmAih42lphhD7iHw73HLdvBWm.', 'seller', '1713623076700_istockphoto-1300845620-612x612.jpg'),
(28, 'Ahoye', 'Ahoye@gmail.com', '$2b$10$NLRr4ecnluRyagn7Pu.PxuV5UeEJWBqfpYJIsfNOnQ/MNqEuuAjMu', 'seller', ''),
(29, 'Alemusfds', 'alemu@gmail.com', '$2b$10$KorE35W/acGk4csI92gyIuL5vfG1y9biGBSJKxM8gSW3mCTYCnGGW', 'buyer', '1713624110798_istockphoto-1300845620-612x612.jpg'),
(39, 'Admin', 'admin@gmail.com', '$2b$10$SEy7LPb4XnrW8LG6aNrLWuzgY2drCsN0zvYFzoCyrimnNNF/.Jo7S', 'admin', '1713623076700_istockphoto-1300845620-612x612.jpg'),
(40, 'Jemberu Demeke', 'abb@gmail.com', '$2b$10$1zJ9Hd44wblbCZDJ9Pb0..u5MWECa0ppobeIfmNc0T4jTaUpZs87.', 'seller', '1713623076700_istockphoto-1300845620-612x612.jpg'),
(42, 'Addis Abeba bole', 'bole@branch.com', '$2b$10$Shce2LaTY5F3noaGSDvIWenz6vDarokOOqfuSLsAUYkn0dTWjlM9.', 'branch', '1713623076700_istockphoto-1300845620-612x612.jpg'),
(44, 'Robel', 'robelaklilu100@gmail.com', '$2b$10$H0GI.QBhIuRCBz1m.zuone38TatbtrvFXwxJXp6NUuLA6RsZSTcg.', 'seller', '1713623076700_istockphoto-1300845620-612x612.jpg'),
(45, 'some', 'some@gmail.com', '$2b$10$id7zDrB8lbPjionrxyKqfe/wUsl6Vx.vgEscn.7QZF4.K/7J8LJUC', 'buyer', '1713623076700_istockphoto-1300845620-612x612.jpg'),
(46, 'Nahom', 'nahom@gmail.com', '$2b$10$8X8be2nhPQUpyPnNg0TlFeXDbScnInIcNtTyghHknYQbI.Nhp.9oO', 'buyer', '1713623076700_istockphoto-1300845620-612x612.jpg'),
(47, 'Wolkite', 'wolkite@branch.com', '$2b$10$z6Z0rUl4V3q6E0S/PeJ8Y.7jzgSruLq6/O1RK27LT8zgDUbRiLe0e', 'branch', '1713623076700_istockphoto-1300845620-612x612.jpg'),
(51, 'zema', 'zema@gmail.com', '$2b$10$0zepAJapIa7.FfMBFbVTBuH3kmdqj0rjeHiBKL35/QfHGs6aRteZW', 'seller', '1713623076700_istockphoto-1300845620-612x612.jpg'),
(61, 'robel', 'r9893517@gmail.com', '$2b$10$N8epJFEsTz2KgLakU2NYg.pEOY1oQTlQkZ5Y.jlqsB5OUahViX.ky', 'buyer', '1713623076700_istockphoto-1300845620-612x612.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `withdraw`
--

CREATE TABLE `withdraw` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `Lastname` varchar(255) DEFAULT NULL,
  `total_revenue` decimal(10,2) DEFAULT NULL,
  `Account_no` varchar(20) DEFAULT NULL,
  `Phone_no` varchar(20) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artwork`
--
ALTER TABLE `artwork`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_bookmark` (`art_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payment_detail`
--
ALTER TABLE `payment_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pending_user`
--
ALTER TABLE `pending_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `print_price`
--
ALTER TABLE `print_price`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `art_id` (`art_id`);

--
-- Indexes for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `withdraw`
--
ALTER TABLE `withdraw`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artwork`
--
ALTER TABLE `artwork`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `payment_detail`
--
ALTER TABLE `payment_detail`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `pending_user`
--
ALTER TABLE `pending_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `print_price`
--
ALTER TABLE `print_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `withdraw`
--
ALTER TABLE `withdraw`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`art_id`) REFERENCES `artwork` (`id`);

--
-- Constraints for table `withdraw`
--
ALTER TABLE `withdraw`
  ADD CONSTRAINT `withdraw_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
