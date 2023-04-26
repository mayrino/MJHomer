var Faq = require('../models/faq');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mjhomer');

var faqs = [
    new Faq({
        title:'How do I track my order?',
        local:'en',
        para:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga necessitatibus labore possimus minus atque. Architecto fuga dolorum maxime eveniet iure expedita, enim praesentium! Tenetur quibusdam dolore nesciunt iusto, minima sed!'
    }),
     new Faq({
        title:'What are your delivery options?',
        local:'en',
        para:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis vel temporibus voluptas alias incidunt, nam, impedit recusandae deleniti sunt autem quos iste iure veniam quaerat eum facere saepe molestias minus.'
    }),
      new Faq({
        title:'How do I return an item?',
        local:'en',
        para:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure enim doloremque exercitationem sapiente aperiam unde at quis voluptatibus qui quidem, illo aliquid debitis eius, perferendis labore eos. Rem nihil, voluptatum.'
    }),
       new Faq({
        title:'How can I contact your couriers?',
        local:'en',
        para:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae quibusdam dicta dignissimos voluptatibus aliquid excepturi, debitis illo, dolorum fugiat perspiciatis quas, libero animi ullam! Placeat est, accusantium modi expedita blanditiis.'
    }),
        new Faq({
        title:'Do you provide International delivery?',
        local:'en',
        para:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus corrupti ipsa, vero, ipsum quia dignissimos amet consectetur quae pariatur cumque voluptatum neque illum explicabo tempore, molestias possimus earum eaque ad!'
    }),
         new Faq({
        title:'What is your returns policy?',
        local:'en',
        para:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam accusamus ipsa voluptatem rem labore in alias officia, iste molestiae, illum ratione explicabo delectus laborum iusto. Tempore aspernatur, nesciunt excepturi eum.'
    }),
         new Faq({
        title:'What is your returns policy?',
        local:'en',
        para:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam accusamus ipsa voluptatem rem labore in alias officia, iste molestiae, illum ratione explicabo delectus laborum iusto. Tempore aspernatur, nesciunt excepturi eum.'
    }),
          new Faq({
        title:'如何查询我的订单?',
        local:'zh',
        para:'語容這場麼平心答的、位禮民成代水的人、入元世以仍有高。們希復出許車同。向眾風了詩體，代前影異李四日護說個社們須來文管臉容票，家二告常女師來開去好她說兩深事我學？媽奇件不日這會選大代我眾話時是數……當始養場：了資走大點我。最車的，呢著個麼醫辦自學長而，發加可長、廣一許度畫長展導起眾錢不，示質考論生性本他從一由、日各加學到作個；就海改放外是這力……以失長感護學放地乎量體一主通……傳體。'
    }),
     new Faq({
        title:'什么是交付选项?',
        local:'zh',
        para:'將密西急子元外得點就代人統器，電象教來人兒生西……字時是身時，次總政自電是，邊立其一精有，學歡排面向才指有果需高此持的景高育比山道；與紀我；等白不香容每、頭且要那從之處；意讀此管方局果過友處未……創代用來記，水了微。這回飛不最力決不及治：生司足最希有景師密覺人如媽有都都上境層'
    }),
      new Faq({
        title:'如何退还商品?',
        local:'zh',
        para:'可上面的百龍國王情幾下夠，條筆們年在就港獲官美新現業為軍委方曾起來行刻來，師藥詩十經。孩多包可人、著到安來兒，蘭有一，停家教！定資願夜；育地十如不……病直一布當當影好超何……過提而論主愛的上至出去時到下，同工對據算大輪操，上由放響你藝邊者體結不方靈盡候；部操點離帶電黨了看民感成人班於同狀科決企作氣國，實金像想：外聽們回四家會議用來而情它玩麼條！經那愛沒？相花後白小料節子的著長社前天麼城中問！光屋持大工主布、往工論毛。'
    }),
       new Faq({
        title:'通过什么方式联系您?',
        local:'zh',
        para:'開一輕花加路，心再城應室大！外達今夠園工小試不經下一，他行路月多回生線笑技的性熱立出現年來汽一如果明樣年程比社只最帶德不線四非化品錢企一其是劇日正性樣。展利回食草童的去，有看上的氣被們可響至喜止紀了了，在導的立本個：化運藝，切用有早。'
    }),
        new Faq({
        title:'是否运行国际购买?',
        local:'zh',
        para:'事西爭業為主事知內，公與人創量子任面車是大手上面元票，用個部，正始等平望全車……才頭一隊，一傳日導指樂部共縣不氣山小年要開交早，白想們玩然成。北大葉：來勢色前數，運聲媽起工；地之的上，出告且得聽中。起好票班，還簡業。我業遊議決那一兒公活就已能假響統的家的是還！區何然用學教寫，願'
    }),
         new Faq({
        title:'退货政策是什么?',
        local:'zh',
        para:'然校都我究說發所小傳什下覺導同，簡著跑步展了年即算經小而處以回，園終同到公可道邊事在視市上起立大力一銷什字父會正子在以手？代信下。高大電識星生身可苦皮錯的系。內大通分系作。香計畫；說始很知空基標能什；的專物。'
    }),
        new Faq({
        title:'是否运行国际购买?',
        local:'zh',
        para:'事西爭業為主事知內，公與人創量子任面車是大手上面元票，用個部，正始等平望全車……才頭一隊，一傳日導指樂部共縣不氣山小年要開交早，白想們玩然成。北大葉：來勢色前數，運聲媽起工；地之的上，出告且得聽中。起好票班，還簡業。我業遊議決那一兒公活就已能假響統的家的是還！區何然用學教寫，願'
    }),
         new Faq({
        title:'退货政策是什么?',
        local:'zh',
        para:'然校都我究說發所小傳什下覺導同，簡著跑步展了年即算經小而處以回，園終同到公可道邊事在視市上起立大力一銷什字父會正子在以手？代信下。高大電識星生身可苦皮錯的系。內大通分系作。香計畫；說始很知空基標能什；的專物。'
    })

];


var done = 0;

for (var i = 0; i < faqs.length; i++) {

    faqs[i].save(saveDone());
}

function saveDone(err, result) {
    done++;
    if (done === faqs.length) {
        exit();
    }
}

function exit() {
    mongoose.disconnect();
}
