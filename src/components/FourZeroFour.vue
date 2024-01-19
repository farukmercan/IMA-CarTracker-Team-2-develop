//Hauptersteller: Adrian Skeja

<template>
    <div :class="$style.contentParent">
          <div :class="$style.content">
                <div :class="$style.div">404</div>
                <div :class="$style.lostInMetaverse1">lost in metaverse</div>
                <div :class="$style.oopsItSeems1">Oops den Link gibt es wohl nicht.</div>
          </div>
          <div :class="$style.rectangleParent">
                <div :class="$style.groupChild" />
                <div :class="$style.backToHomeParent">
                      <div :class="$style.backToHome1">Zurück zu Home</div>
                      
                </div>
          </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue'
    
    
    export default defineComponent({
          name: "Group"})</script><style module>.div {
          position: absolute;
          top: 0px;
          left: 49px;
          font-weight: 600;
          font-family: Khand;
          text-align: left;
          display: flex;
          align-items: center;
          width: 245px;
          height: 173px;
    }
          .lostInMetaverse1 {
                position: absolute;
                top: 173px;
                left: 0px;
                font-size: 32px;
                text-transform: capitalize;
                font-weight: 500;
                display: inline-block;
                width: 343px;
                height: 57px;
          }
          .oopsItSeems1 {
                position: absolute;
                top: 217px;
                left: 8px;
                font-size: 22px;
                font-weight: 300;
          }
          .content {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 343px;
                height: 243px;
          }
          .groupChild {
                position: absolute;
                top: 0px;
                left: 0px;
                border-radius: 25.5px;
                box-shadow: 0px 14px 20px -20px rgba(0, 0, 0, 0.15);
                border: 1px solid #fff;
                box-sizing: border-box;
                width: 219px;
                height: 43px;
          }
          .backToHome1 {
                position: absolute;
                top: 0px;
                left: 0px;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 187px;
                height: 28px;
          }
          .groupItem {
                position: absolute;
                top: 14px;
                left: 1px;
                max-height: 100%;
                width: 23px;
                object-fit: contain;
          }
          .backToHomeParent {
                position: absolute;
                top: 8px;
                left: 23px;
                width: 187px;
                height: 28px;
          }
          .rectangleParent {
                position: absolute;
                top: 276px;
                left: 62px;
                width: 219px;
                height: 43px;
                font-size: 18px;
          }
          .contentParent {
                position: relative;
                width: 100%;
                height: 319px;
                text-align: center;
                font-size: 182px;
                color: #fff;
                font-family: Roboto;
          }
    
    </style>