# Game Launcher

This project creates a multi element game:
 - Multiple Choice
 - Asteroid
 - Robot Dance Party

Using Phaser.js / phaser.io game framework

## Getting Started
- https://labs.phaser.io/edit.html?src=src\game%20objects\bitmaptext\retro%20font\retro%20text%201.js#
- https://phaser.io/

## Tested on
- Node.js v16.20.2
- Azus ROG z15 Laptop
  - Linux Mint 21.2 Victoria
  - 5.15.0-88-generic
- NVidia Jetson Orin Nano 8gb Jetpack 6p1
  - VERSION="22.04.5 LTS (Jammy Jellyfish)"
  - Linux jetson-orin 5.15.148-tegra #1 SMP PREEMPT

### Prerequisites


Download Node.js using node version manager, from https://nodejs.org/en/download


NVidia Jetson Orin specific
- To get webGL / utilize GPU for Phaser.io (highly recommended):
  - install firefox using PPA from Mozilla:
    - `sudo add-apt-repository ppa:mozillateam/ppa`
    - ```
echo '
Package: *
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 1001

Package: firefox
Pin: version 1:1snap*
Pin-Priority: -1
' | sudo tee /etc/apt/preferences.d/mozilla-firefox
```
    - `sudo snap remove firefox`
    - `sudo apt install firefox`
( https://askubuntu.com/questions/1399383/how-to-install-firefox-as-a-traditional-deb-package-without-snap-in-ubuntu-22 )
( https://forums.developer.nvidia.com/t/webgl-finally-working-firefox-jetpack-6/277524 )

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/game_launcher.git
    cd game_launcher
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Project

To launch the project, run:
```sh
npm start
