-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2021 at 03:21 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unify`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `genre` varchar(20) NOT NULL,
  `release_date` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `name`, `genre`, `release_date`) VALUES
(1, 'A Head Full Of Dreams', 'Pop', 2021),
(2, 'Living Things', 'Hard Rock', 2021),
(3, 'The Days _Nights (EP)', 'Dance', 2021),
(4, 'Some Nights - Single', 'Alternativa', 2012),
(5, 'We Are Young - Single', 'Alternativa', 2011),
(6, 'Memories - Single', 'Pop', 2019),
(7, 'Don\'t Stop Me Now - Single', 'Rock', 1978),
(8, 'We Are The Champions - Single', 'Rock', 2000),
(9, 'Misery - Single', 'Pop', 2014),
(10, 'V', 'Pop', 2015);

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`name`) VALUES
('Avicii'),
('Coldplay'),
('Fun'),
('Linkin Park'),
('Maroon 5'),
('Queen');

-- --------------------------------------------------------

--
-- Table structure for table `artists_albums`
--

CREATE TABLE `artists_albums` (
  `artist_name` varchar(20) NOT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `artists_albums`
--

INSERT INTO `artists_albums` (`artist_name`, `album_id`) VALUES
('Avicii', 3),
('Coldplay', 1),
('Fun', 4),
('Fun', 5),
('Linkin Park', 2),
('Maroon 5', 6),
('Maroon 5', 9),
('Maroon 5', 10),
('Queen', 7),
('Queen', 8);

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `user` varchar(20) NOT NULL,
  `pl_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `playlists_songs`
--

CREATE TABLE `playlists_songs` (
  `user` varchar(20) NOT NULL,
  `pl_name` varchar(20) NOT NULL,
  `song_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `length` time NOT NULL,
  `plays` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`id`, `name`, `length`, `plays`) VALUES
(1, 'The Days (Henrik B Remix)', '00:03:56', 0),
(2, 'The Days', '00:04:38', 0),
(3, 'The Nights (Felix Jaehn Remix)', '00:03:20', 0),
(4, 'The Nights', '00:02:56', 0),
(5, 'A Head Full Of Dreams', '00:03:43', 0),
(6, 'Adventure Of A Lifetime', '00:04:23', 0),
(7, 'Amazing Day', '00:04:31', 0),
(8, 'Army Of One', '00:06:16', 0),
(9, 'Bird', '00:03:49', 0),
(10, 'Colour Spectrum', '00:01:00', 0),
(11, 'Everglow', '00:04:42', 0),
(12, 'Fun (feat. Tove Lo)', '00:04:27', 0),
(13, 'Hymn For The Weekend', '00:04:18', 0),
(14, 'Kaleidoscope', '00:01:51', 0),
(15, 'Miracles', '00:03:55', 0),
(16, 'Up&Up', '00:06:45', 0),
(17, 'Burn It Down', '00:03:51', 0),
(18, 'Castle Of Glass', '00:03:25', 0),
(19, 'I\'ll Be Gone', '00:03:31', 0),
(20, 'In My Remains', '00:03:20', 0),
(21, 'Lies Greed Misery', '00:02:27', 0),
(22, 'Lost In The Echo', '00:03:25', 0),
(23, 'Powerless', '00:03:43', 0),
(24, 'Roads Untraveled', '00:03:49', 0),
(25, 'Skin To Bone', '00:02:48', 0),
(26, 'Tinfoil', '00:01:11', 0),
(27, 'Until It Breaks', '00:03:43', 0),
(28, 'Victimized', '00:01:46', 0),
(29, 'We Are Young', '00:04:37', 0),
(30, 'Some Nights', '00:04:11', 0),
(31, 'Memories', '00:03:09', 0),
(32, 'Don\'t Stop Me Now', '00:03:36', 0),
(33, 'We Are The Champions', '00:03:00', 0),
(34, 'Misery', '00:03:36', 0),
(35, 'Maps', '00:03:10', 0),
(36, 'Animals', '00:03:51', 0),
(37, 'It Was Always You', '00:04:00', 0),
(38, 'Unkiss Me', '00:03:58', 0),
(39, 'Sugar', '00:03:55', 0),
(40, 'Leaving California', '00:03:23', 0),
(41, 'In Your Pocket', '00:03:39', 0),
(42, 'New Love', '00:03:16', 0),
(43, 'Coming Back For You', '00:03:47', 0),
(44, 'Feelings', '00:03:14', 0),
(45, 'My Heart Is Open', '00:03:57', 0),
(46, 'Shoot Love', '00:03:10', 0),
(47, 'Sex And Candy', '00:04:25', 0),
(48, 'Lost Stars', '00:04:27', 0);

-- --------------------------------------------------------

--
-- Table structure for table `songs_albums`
--

CREATE TABLE `songs_albums` (
  `song_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `songs_albums`
--

INSERT INTO `songs_albums` (`song_id`, `album_id`) VALUES
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 2),
(18, 2),
(19, 2),
(20, 2),
(21, 2),
(22, 2),
(23, 2),
(24, 2),
(25, 2),
(26, 2),
(27, 2),
(28, 2),
(29, 5),
(30, 4),
(31, 6),
(32, 7),
(33, 8),
(34, 9),
(35, 10),
(36, 10),
(37, 10),
(38, 10),
(39, 10),
(40, 10),
(41, 10),
(42, 10),
(43, 10),
(44, 10),
(45, 10),
(46, 10),
(47, 10),
(48, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(20) NOT NULL COMMENT 'user username',
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `gender` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `password`, `gender`) VALUES
('vitto', 'vitto@vitto.com', '1ae6c354983ccd08987e05a5280d6a1c7edb5ae8', 'M');

-- --------------------------------------------------------

--
-- Table structure for table `user_songs`
--

CREATE TABLE `user_songs` (
  `username` varchar(50) NOT NULL,
  `song_id` int(11) NOT NULL,
  `added` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_songs`
--

INSERT INTO `user_songs` (`username`, `song_id`, `added`) VALUES
('vitto', 1, '2021-02-01'),
('vitto', 2, '2021-02-01'),
('vitto', 3, '2021-02-01'),
('vitto', 4, '2021-02-01'),
('vitto', 5, '2021-02-01'),
('vitto', 6, '2021-02-01'),
('vitto', 7, '2021-02-01'),
('vitto', 8, '2021-02-01'),
('vitto', 9, '2021-02-01'),
('vitto', 10, '2021-02-01'),
('vitto', 11, '2021-02-01'),
('vitto', 12, '2021-02-01'),
('vitto', 13, '2021-02-01'),
('vitto', 14, '2021-02-01'),
('vitto', 15, '2021-02-01'),
('vitto', 16, '2021-02-01'),
('vitto', 17, '2021-02-01'),
('vitto', 18, '2021-02-01'),
('vitto', 19, '2021-02-01'),
('vitto', 20, '2021-02-01'),
('vitto', 21, '2021-02-01'),
('vitto', 22, '2021-02-01'),
('vitto', 23, '2021-02-01'),
('vitto', 24, '2021-02-01'),
('vitto', 25, '2021-02-01'),
('vitto', 26, '2021-02-01'),
('vitto', 27, '2021-02-01'),
('vitto', 28, '2021-02-01'),
('vitto', 29, '2021-02-01'),
('vitto', 30, '2021-02-01'),
('vitto', 31, '2021-02-01'),
('vitto', 32, '2021-02-01'),
('vitto', 34, '2021-02-01'),
('vitto', 36, '2021-02-04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `artists_albums`
--
ALTER TABLE `artists_albums`
  ADD PRIMARY KEY (`artist_name`,`album_id`),
  ADD KEY `album_id` (`album_id`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`user`,`pl_name`);

--
-- Indexes for table `playlists_songs`
--
ALTER TABLE `playlists_songs`
  ADD PRIMARY KEY (`user`,`pl_name`,`song_id`),
  ADD KEY `playlists_songs_ibfk_1` (`song_id`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `songs_albums`
--
ALTER TABLE `songs_albums`
  ADD PRIMARY KEY (`song_id`,`album_id`),
  ADD KEY `album_id` (`album_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_songs`
--
ALTER TABLE `user_songs`
  ADD PRIMARY KEY (`username`,`song_id`),
  ADD KEY `song_id` (`song_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `artists_albums`
--
ALTER TABLE `artists_albums`
  ADD CONSTRAINT `artists_albums_ibfk_2` FOREIGN KEY (`artist_name`) REFERENCES `artists` (`name`) ON DELETE CASCADE,
  ADD CONSTRAINT `artists_albums_ibfk_3` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `playlists_songs`
--
ALTER TABLE `playlists_songs`
  ADD CONSTRAINT `playlists_songs_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `playlists_songs_ibfk_2` FOREIGN KEY (`user`,`pl_name`) REFERENCES `playlists` (`user`, `pl_name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `songs_albums`
--
ALTER TABLE `songs_albums`
  ADD CONSTRAINT `songs_albums_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `songs_albums_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_songs`
--
ALTER TABLE `user_songs`
  ADD CONSTRAINT `user_songs_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
