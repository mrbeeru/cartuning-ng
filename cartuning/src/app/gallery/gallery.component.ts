import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  chunksLoaded = 0;
  showLoadButton = true;

  constructor() { }

  ngOnInit(): void {
    this.loadNextChunk();
  }

  loadNextChunk() {

   
    
    var idx = this.galleryArray.length;
    
    for (var i = idx; i < idx + 4 && i < this.chunk1.length; i++)
      this.galleryArray.push(this.chunk1[i]);

    if (this.chunksLoaded % 2 == 0 && this.galleryArray.length < this.chunk1.length)
      this.galleryArray.push(this.chunk1[this.galleryArray.length]);
    

    if (this.chunk1.length <= this.galleryArray.length){
      this.showLoadButton = false;
      return;
    }


    this.chunksLoaded++;
  }
  
  galleryArray = [];

  chunk1 = [
    {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/83544721_551958298743318_5677641831223918592_o.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_ohc=kpMkEAuLyAoAX-JFIby&_nc_ht=scontent.fcra1-1.fna&oh=fc47251bac81eb4f038e1c068f242b9e&oe=5F80E84E",
       alt:"",
      title : "1",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/119158071_693727487899731_2600885892142725100_o.jpg?_nc_cat=105&_nc_sid=8bfeb9&_nc_ohc=1azmO9bAHxgAX8Shkll&_nc_oc=AQm0juhqksHEvCvMqxxt48w-FtJE5ue02xiQCzTDs_W761oDkZb5cPHMGqw24zcsyFw&_nc_ht=scontent.fcra1-1.fna&oh=ccccc32e41db86ddc8913a9851c2bd35&oe=5F815B6D",
       alt:"",
      title : "2",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/119057111_692448864694260_7012302914432326468_o.jpg?_nc_cat=102&_nc_sid=8bfeb9&_nc_ohc=quClGqrUxhIAX-mkVNZ&_nc_ht=scontent.fcra1-1.fna&oh=7eccb5eb0b902a66af8c845b97737f9f&oe=5F7F0DAE",
       alt:"",
      title : "3",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/116429134_664566900815790_7993533994068228492_o.jpg?_nc_cat=102&_nc_sid=8bfeb9&_nc_ohc=1uLcjeKoJSYAX8qU6g1&_nc_ht=scontent.fcra1-1.fna&oh=d1dccc4be1fe95848669ca58617fcc3e&oe=5F80A208",
       alt:"",
      title : "4",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/117526553_672722356666911_8772493914683377108_o.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_ohc=pNr7Y0DxhvUAX8JdIIH&_nc_ht=scontent.fcra1-1.fna&oh=e9a12601d5840440ad4b2e0380b7f894&oe=5F81C0E7",
       alt:"",
      title : "5",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/107354854_649352242337256_193776557690721990_o.jpg?_nc_cat=101&_nc_sid=8bfeb9&_nc_ohc=TgOB7x3KyPIAX9np-HT&_nc_ht=scontent.fcra1-1.fna&oh=0820eeecbc9bc1aa901af9c93a72d7d1&oe=5F7EAEB1",
       alt:"",
      title : "6",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/118796466_688922068380273_3629528721480550875_o.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_ohc=50Jo0HDD6ZMAX_RvCII&_nc_ht=scontent.fcra1-1.fna&oh=b4b9a58c1643e7f2a8c59cf212ef1eb7&oe=5F81D858",
       alt:"",
      title : "7",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/116397702_664566977482449_4803508733860397034_o.jpg?_nc_cat=100&_nc_sid=8bfeb9&_nc_ohc=QltRFY7HRYUAX98VM7o&_nc_ht=scontent.fcra1-1.fna&oh=6444103035cc998dbaab7e58febc588a&oe=5F807866",
       alt:"",
      title : "8",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/116220256_664567314149082_5832874543395886892_o.jpg?_nc_cat=101&_nc_sid=8bfeb9&_nc_ohc=hkunyevm_QEAX_a0HGh&_nc_ht=scontent.fcra1-1.fna&oh=0d9cf3a8179aafaa265797435fd157f9&oe=5F7F12D1",
       alt:"",
      title : "9",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/116583318_664567430815737_6543375081646953886_o.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_ohc=23SkVP2AuaoAX9ThX2Y&_nc_ht=scontent.fcra1-1.fna&oh=f719227ced9ae78f4beb0b5664e5e95f&oe=5F7F17EF",
       alt:"",
      title : "10",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/75557431_647372652535215_8100246590106673545_o.jpg?_nc_cat=100&_nc_sid=8bfeb9&_nc_ohc=L5hP0zdLyc8AX_KLBLw&_nc_ht=scontent.fcra1-1.fna&oh=acf71df7f66af9250c4da06621b04cbc&oe=5F819FFC",
       alt:"",
      title : "11",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/72761367_647372675868546_7219535211863222596_o.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_ohc=Qid7mof6xgoAX-XjZJP&_nc_ht=scontent.fcra1-1.fna&oh=f6eded524b4251dff1ccc9bf92f31d29&oe=5F81E20F",
       alt:"",
      title : "12",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/107002363_647372695868544_4209631014854802538_o.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_ohc=RkmlTOktt8MAX_Yw0AY&_nc_ht=scontent.fcra1-1.fna&oh=66545a90c37dba0da19a56a5a27b6a6f&oe=5F7F2499",
       alt:"",
      title : "13",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/105569842_642007006405113_285987786247045264_o.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_ohc=wYGMjGI81_4AX9PjuZf&_nc_ht=scontent.fcra1-1.fna&oh=c1fad74c6931daee4346621287b9491e&oe=5F7FD99A",
       alt:"",
      title : "14",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/104966789_639672586638555_705290919597699876_o.jpg?_nc_cat=110&_nc_sid=8bfeb9&_nc_ohc=GTz7PnkOxQAAX_3iXp-&_nc_ht=scontent.fcra1-1.fna&oh=01d98468cddd8e4a6f3ea5db05d7b6df&oe=5F7E422A",
       alt:"",
      title : "15",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/98354728_620358878569926_4725427790491418624_o.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_ohc=y8GFZI4l-tsAX-C_NrJ&_nc_ht=scontent.fcra1-1.fna&oh=6fad732b2679440500aac9e55f5729bc&oe=5F816806",
       alt:"",
      title : "16",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/97152898_616596612279486_5386889205462859776_o.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=x8ODAnuqL7sAX88wHi-&_nc_ht=scontent.fcra1-1.fna&oh=9059102e0b78f871d978566cb4886fca&oe=5F811A88",
       alt:"",
      title : "17",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/87367564_569879336951214_5038564282560675840_o.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=dTIOS8TNfOkAX_JlYyf&_nc_ht=scontent.fcra1-1.fna&oh=92d914ddd673a493b896f1fa73bdcf1c&oe=5F7FCCCE",
       alt:"",
      title : "18",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/83079549_550217468917401_7737378618761805824_o.jpg?_nc_cat=105&_nc_sid=8bfeb9&_nc_ohc=YVdBFW-yOCMAX8ekSM6&_nc_ht=scontent.fcra1-1.fna&oh=9f61c9d28162488d5c52972b789763e7&oe=5F7F4E66",
       alt:"",
      title : "19",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/37597987_253301535275664_5960772419042934784_n.png?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=Okl6xv5GoloAX-lecW_&_nc_ht=scontent.fcra1-1.fna&oh=d09eab7f02aff6e25e595c029a8016b2&oe=5F81BFC3",
       alt:"",
      title : "20",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/34367764_218878568717961_7263356117822996480_n.jpg?_nc_cat=105&_nc_sid=174925&_nc_ohc=SZG4YlZJ0YYAX-lQkMU&_nc_ht=scontent.fcra1-1.fna&oh=13b299d2f75bb3d90b210bb620ae9085&oe=5F8091DA",
       alt:"",
      title : "21",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/106065371_645813142691166_6850066752320379302_o.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=3uQTruDGif0AX8ID3eU&_nc_ht=scontent.fcra1-1.fna&oh=3c07a8a92f0dc08cb346c5d93f7c9a81&oe=5F820BC5",
       alt:"",
      title : "22",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/98339285_620358825236598_9166884429409288192_o.jpg?_nc_cat=108&_nc_sid=8bfeb9&_nc_ohc=C146hF55pNkAX-pf8e9&_nc_ht=scontent.fcra1-1.fna&oh=158c78cf4b5641063b8c85731be3537a&oe=5F7EBDEA",
       alt:"",
      title : "23",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/89445049_576357696303378_387293466121469952_o.jpg?_nc_cat=105&_nc_sid=8bfeb9&_nc_ohc=nBloU5qEh80AX8NbYFy&_nc_ht=scontent.fcra1-1.fna&oh=199121cfff974ce11ab65481d36bda55&oe=5F812783",
       alt:"",
      title : "24",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/80950699_536254446980370_1283504217100648448_o.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=713I8G4ycREAX8EvyLs&_nc_ht=scontent.fcra1-1.fna&oh=f3208e9cae70105b9763eac5d670742b&oe=5F8082F8",
       alt:"",
      title : "25",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/75450092_502432200362595_6959922961897750528_o.jpg?_nc_cat=104&_nc_sid=8bfeb9&_nc_ohc=pvMv3JadaIIAX9G8MDv&_nc_ht=scontent.fcra1-1.fna&oh=ea953e6c4c3d18366dcc709c6fad1df2&oe=5F7EC5C0",
       alt:"",
      title : "26",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/71063311_462161531056329_1501113940652851200_o.jpg?_nc_cat=100&_nc_sid=8bfeb9&_nc_ohc=FMqWv--15hAAX8TUt8W&_nc_ht=scontent.fcra1-1.fna&oh=caacdfe739df3a59364b5453375e6f27&oe=5F7EFDDA",
       alt:"",
      title : "27",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/69687280_453094788629670_111173377326055424_o.jpg?_nc_cat=105&_nc_sid=8bfeb9&_nc_ohc=71eNzqdyCJIAX_0gikf&_nc_ht=scontent.fcra1-1.fna&oh=3a0b071b5f3c6f403e483b0547437d40&oe=5F7E71B2",
       alt:"",
      title : "28",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/65031867_413913762547773_5720933177422249984_o.jpg?_nc_cat=107&_nc_sid=8bfeb9&_nc_ohc=HaO0xF6aPEMAX9QpxDj&_nc_ht=scontent.fcra1-1.fna&oh=cf140cef84963796b419e94e1aad1816&oe=5F807DCD",
       alt:"",
      title : "29",
      description:"Some sample text about the article this hexagon leads to",
      },
      {
      imgSrc:"https://scontent.fcra1-1.fna.fbcdn.net/v/t1.0-9/74411245_491906338081848_2778578944109051904_n.jpg?_nc_cat=100&_nc_sid=8bfeb9&_nc_ohc=F-z9R0YIu1MAX_IT-Hr&_nc_ht=scontent.fcra1-1.fna&oh=6b848ab213efa0ed407df19b7385b080&oe=5F7EF291",
       alt:"",
      title : "30",
      description:"Some sample text about the article this hexagon leads to",
      },
  ]
}
