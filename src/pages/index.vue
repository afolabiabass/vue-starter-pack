<template>
  <div class="wizard">
    <nav>
      <a
        href="www.getdisha.io"
        class="navbar-brand">
        <img
          src="@/assets/img/disha-new-pm.svg"
          alt="disha" >
      </a>
      <div class="nav-right">
        <p>Already have an account?</p>
        <el-button
          type="primary">Login</el-button>
      </div>
    </nav>
    <div class="row">
      <div class="col-xl-6 pr-0">
        <div class="bg-details">
          <el-tabs type="card">
            <el-tab-pane label="Contact">
              <template>
                <div class="row header-text">
                  <div class="col-md-12">
                    <h5>Add your personal and company details</h5>
                  </div>
                </div>
                <form>
                  <div class="row">
                    <div
                      v-for="field in formFields"
                      :key="field.id"
                      class="col-md-6 d-flex flex-column justify-content-center">
                      <div class="fancy-field form-group">
                        <input
                          :id="field.id"
                          v-model="field.value"
                          :name="field.name"
                          :type="field.type"
                          class="input form-control"
                          @change="checkField"
                          @focus="focusField">
                        <label :for="field.id">{{ field.name }}</label>
                      </div>
                    </div>
                  </div>
                </form>
              </template>
            </el-tab-pane>
            <el-tab-pane label="Social">
              <template>
                <div class="row">
                  <div class="col-md-12">
                    <div class="header-text">
                      <h5>Add social media link</h5>
                    </div>
                    <div class="content-card social-icons">
                      <div class="row px-2">
                        <div class="col-sm-12 col-md-8 d-flex flex-wrap">
                          <div
                            v-for="item in socialList"
                            :key="item.id"
                            :data-match="item.name"
                            class="social-icon"
                            @click="addLink(item.name)">
                            <i :class="`fab fa-${item.icon}`"/>
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-4">
                          <p class="style-title">Icon Style</p>
                          <el-select
                            v-model="selectedIconShape"
                            class="w-100">
                            <el-option
                              v-for="shape in iconShapes"
                              :key="shape.id"
                              :label="shape.label"
                              :value="shape.value"/>
                          </el-select>
                        </div>
                      </div>
                    </div>
                    <draggable
                      v-model="selectedLinks"
                      :options="{group:'links'}"
                      @start="drag=true"
                      @end="drag=false">
                      <div
                        v-for="(link,index) in selectedLinks"
                        :id="link.id"
                        :key="link.id">
                        <div class="col-md-12 content-card social-link">
                          <div class="move-tool">
                            <img src="@/assets/img/move.svg">
                          </div>
                          <div class="selected-icon">
                            {{ link.id }}
                          </div>
                          <div class="d-flex align-items-center w-100">
                            <el-input
                              :id="link.id"
                              v-model="link.value"
                              placeholder="Enter link"
                              class="input-with-select"/>
                            <div
                              :data-match="link.id"
                              class="delete-link"
                              @click="deleteSocialLink(index)" >
                              <img src="../assets/img/close.svg">
                            </div>
                          </div>
                        </div>
                      </div>
                    </draggable>
                  </div>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="Style">
              <div class="row">
                <div class="col-md-12 header-text">
                  <h5>Colors, Font and Avatar</h5>
                </div>
              </div>
              <div class="content-card style-card">
                <div class="row">
                  <div class="col-md-4 c-spacing">
                    <p class="style-title">Link Color</p>
                    <div class="color-picker">
                      <el-color-picker
                        v-model="linkColor"
                        :show-alpha="true"
                        color-format="hex"
                        @active-change="changeLinkColor"/>
                      <el-input v-model="linkColor"/>
                    </div>
                  </div>
                  <div class="col-md-4 c-spacing">
                    <p class="style-title">Font family</p>
                    <el-select
                      v-model="defaultFont"
                      class="fontlist w-100">
                      <el-option-group
                        v-for="fontFamily in fontsList"
                        :key="fontFamily.fontFamily"
                        :label="fontFamily.fontFamily">
                        <el-option
                          v-for="font in fontFamily.fonts"
                          :key="font.value"
                          :label="font.label"
                          :value="font.value"/>
                      </el-option-group>
                    </el-select>
                  </div>
                  <div class="col-md-4 c-spacing">
                    <p class="style-title">Font Size</p>
                    <el-select
                      v-model="selectedFontSize"
                      class="w-100">
                      <el-option
                        v-for="size in fontSizes"
                        :key="size.id"
                        :label="size.label"
                        :value="size.value"/>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="content-card style-card">
                <div class="row">
                  <div class="col-md-8 c-spacing">
                    <el-upload
                      :limit="1"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      action="">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="avatar-uploader">
                          <img
                            src=""
                            alt="Upload avatar"
                            class="avatar">
                        </div>
                        <div class="ml-3">
                          <div class="avatar-desc">
                            <p>Upload display image in jpg, png or gif format.<br>
                              Preferably as a square e.g 500x500px<br>
                              Maximum file size is 100KB.</p>
                          </div>
                          <div align="left">
                            <el-button
                              size="small"
                              class="secondary">Click to upload</el-button>
                          </div>
                        </div>
                      </div>
                    </el-upload>
                  </div>
                  <div class="col-md-4 d-flex flex-column c-spacing">
                    <div class="c-spacing">
                      <p class="style-title">Image Style</p>
                      <el-select
                        v-model="selectedAvatarShape"
                        class="w-100">
                        <el-option
                          v-for="shape in avatarShapes"
                          :key="shape.id"
                          :label="shape.label"
                          :value="shape.value"/>
                      </el-select>
                    </div>
                    <div>
                      <p class="style-title">Image Position</p>
                      <el-select
                        v-model="selectedAvatarPosition"
                        class="w-100">
                        <el-option
                          v-for="position in avatarPositions"
                          :key="position.id"
                          :label="position.label"
                          :value="position.value"/>
                      </el-select>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <div>
                      <p class="style-title">Avatar Size</p>
                      <el-slider
                        v-model="defaultAvatarSize"
                        :step="10"
                        :format-tooltip="formatTooltip"/>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <p class="style-title">Spacing</p>
                    <el-slider
                      v-model="defaultSpacing"
                      :step="10"
                      :format-tooltip="formatTooltipSpacing"/>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Addons">
              <template>
                <div class="row">
                  <div class="col-md-12 header-text">
                    <h5>Addons</h5>
                  </div>
                </div>
                <div class="adds-on-list mt-3">
                  <div class="content-card addons-card">
                    <div class="row">
                      <div class="col-md-12 d-flex justify-content-between align-items-center">
                        <p class="mb-0">Add banner</p>
                        <el-switch
                          v-model="showBanner"
                          :on-value="showBanner"
                          :off-value="!showBanner"/>
                      </div>
                      <div
                        v-if="showBanner"
                        class="col-md-12 banner-content mt-3">
                        <div class="row mb-4">
                          <div class="col-md-6 banner-view">
                            <div class="banner">
                              <el-upload
                                :on-success="handleBannerSuccess"
                                :show-file-list="true"
                                :before-upload="beforeBannerUpload"
                                action=""
                                class="banner-uploader">
                                <img
                                  src=""
                                  alt=""
                                  class="banner">
                              </el-upload>
                            </div>
                          </div>
                          <div class="col-md-6 d-flex align-items-center">
                            <div class="avatar-desc">
                              <p>Upload banner image in jpg, png or gif format.<br>
                                Image must be 450x100 px.<br>
                                Maximum file size is 200KB. </p>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="content-card banner-link">
                              <div class="move-tool">
                                <img src="@/assets/img/link.svg">
                              </div>
                              <div class="selected-icon">
                                Banner Link
                              </div>
                              <div class="d-flex align-items-center w-100">
                                <el-input
                                  v-model="bannerUrl"
                                  placeholder="Enter banner link"
                                  class="input-with-select"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content-card addons-card">
                    <div class="row">
                      <div class="col-md-12 d-flex justify-content-between align-items-center">
                        <p class="mb-0">Add HTML</p>
                        <el-switch
                          v-model="showHTML"
                          :on-value="showHTML"
                          :off-value="!showHTML"/>
                      </div>
                      <div
                        v-if="showHTML"
                        class="col-md-12 disclaimer-text mb-2 mt-3">

                      </div>
                    </div>
                  </div>
                  <div class="content-card addons-card">
                    <div class="row">
                      <div class="col-md-12 d-flex justify-content-between align-items-center">
                        <p class="mb-0">Add disclaimer</p>
                        <el-switch
                          v-model="showDisclaimer"
                          :on-value="showDisclaimer"
                          :off-value="!showDisclaimer"/>
                      </div>
                      <div
                        v-if="showDisclaimer"
                        class="col-md-12 disclaimer-text mb-2 mt-3">
                        <el-input
                          :rows="5"
                          v-model="text"
                          value="Hello"
                          type="textarea"/>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="col-xl-6 pl-0">
        <div class="bg-preview">
          <div class="preview-header">.</div>
          <div class="preview-content">
            <div class="row">
              <div class="col-md-12 header-text">
                <h5>View email signature and other available styles</h5>
              </div>
            </div>
            <div class="d-flex w-100">
              <div class="mail-sample">
                <div class="email-header">
                  Compose new mail
                </div>
                <div class="email-details">
                  <p>To: Musa Bello musabello@gmail.com</p>
                  <p>Subject: </p>
                </div>
                <div class="email-content">
                  <p>
                    Hey John,<br>
                    Welcome to Disha!
                    <br><br>
                    Cheers,<br>
                  </p>
                </div>
                <div class="email-signature">
                  <template-one
                    :contact="{show,firstName,lastName,jobTitle,companyName,email,phoneNumber,website,address}"
                    :selected-links="selectedLinks"
                    :styles="{linkColor,iconShape,selectedFont,avatarSizee,avatarShape,avatarPosition,contentSpacing,fontSize}"
                    :addons="{addBanner,addDisclaimer,addHTML,htmlText,disclaimerText,linkToBanner}"/>
                </div>
              </div>
              <div class="templates-holder">
                <p>Choose layout</p>
                <ul class="templates">
                  <li
                    :class="{ active : activeTemplate === 1 }"
                    @click="activateTemplate(1)"><img src="@/assets/img/one.svg"></li>
                  <li><img src="@/assets/img/two.svg"></li>
                  <li><img src="@/assets/img/three.svg"></li>
                  <li><img src="@/assets/img/four.svg"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import draggable from 'vuedraggable';
import TemplateOne from '../components/templates/one.vue';

export default {
  components: {
    draggable,
    TemplateOne,
  },
  data() {
    return {
      show: false,
      formFields: [
        {
          name: 'First Name',
          value: '',
          id: 'first_name',
          type: 'text',
        },
        {
          name: 'Last Name',
          value: '',
          id: 'last_name',
          type: 'text',
        },
        {
          name: 'Job Title',
          value: '',
          id: 'job_title',
          type: 'text',
        },
        {
          name: 'Company Name',
          value: '',
          id: 'company_name',
          type: 'text',
        },
        {
          name: 'Email',
          value: '',
          id: 'email',
          type: 'email',
        },
        {
          name: 'Phone Number(s)',
          value: '',
          id: 'phone_number',
          type: 'text',
        },
        {
          name: 'Website',
          value: '',
          id: 'website',
          type: 'url',
        },
        {
          name: 'Address',
          value: '',
          id: 'address',
          type: 'text',
        },
      ],
      activeField: false,
      active: 0,
      counter: 0,
      selectedLinks: [],
      socialList: [
        {
          id: 1,
          name: 'Twitter',
          icon: 'twitter',
        },
        {
          id: 2,
          name: 'Facebook',
          icon: 'facebook',
        },
        {
          id: 3,
          name: 'Instagram',
          icon: 'instagram',
        },
        {
          id: 4,
          name: 'LinkedIn',
          icon: 'linkedin',
        },
        {
          id: 5,
          name: 'Dribbble',
          icon: 'dribbble',
        },
        {
          id: 6,
          name: 'Behance',
          icon: 'behance',
        },
        {
          id: 7,
          name: 'Discord',
          icon: 'discord',
        },
        {
          id: 8,
          name: 'GitHub',
          icon: 'github',
        },
        {
          id: 10,
          name: 'Pinterest',
          icon: 'pinterest-p',
        },
        {
          id: 11,
          name: 'Slack',
          icon: 'slack-hash',
        },
        {
          id: 12,
          name: 'Vimeo',
          icon: 'vimeo-v',
        },
        {
          id: 13,
          name: 'Medium',
          icon: 'medium-m',
        },
        {
          id: 14,
          name: 'Figma',
          icon: 'figma',
        },
        {
          id: 15,
          name: 'Apple',
          icon: 'apple',
        },
        {
          id: 16,
          name: 'Spotify',
          icon: 'spotify',
        },
        {
          id: 17,
          name: 'SoundCloud',
          icon: 'soundcloud',
        },
      ],
      linkColor: '#ff8800',
      defaultFont: 'Arial',
      selectedFontFamily: 'sans-serif',
      fontsList: [
        {
          fontFamily: 'Serif',
          fonts: [
            {
              value: 'Georgia, serif',
              label: 'Georgia',
            },
            {
              value: 'Palatino Linotype, serif',
              label: 'Palatino Linotype',
            },
            {
              value: 'Times New Roman, serif',
              label: 'Times New Roman',
            },
          ],
        },
        {
          fontFamily: 'Sans-serif',
          fonts: [
            {
              value: 'Arial, sans-serif',
              label: 'Arial',
            },
            {
              value: 'Comic Sans, sans-serif',
              label: 'Comic Sans',
            },
            {
              value: 'Impact',
              label: 'Impact',
              family: 'san-serif',
            },
            {
              value: 'Lucida Sans Unicode, sans-serif',
              label: 'Lucida Sans Unicode',
            },
            {
              value: 'Tahoma, sans-serif',
              label: 'Tahoma',
            },
            {
              value: 'Verdana, sans-serif',
              label: 'Verdana',
            },
          ],
        },
        {
          fontFamily: 'Monospace',
          fonts: [
            {
              value: 'Courier New, monospace',
              label: 'Courier New',
            },
            {
              value: 'Lucida Console, monospace',
              label: 'Lucida Console',
            },
          ],
        },
      ],
      selectedFontSize: 'Medium',
      fontSizes: [
        {
          value: 'Small',
          label: 'Small',
        },
        {
          value: 'Medium',
          label: 'Medium',
        },
        {
          value: 'Large',
          label: 'Large',
        },
      ],
      avatar: 1,
      avatarLink: '',
      selectedAvatarShape: 'Oval',
      avatarShapes: [
        {
          id: 1,
          value: 'Square',
          label: 'Square',
        },
        {
          id: 2,
          value: 'Oval',
          label: 'Oval',
        },
        {
          id: 3,
          value: 'Rounded',
          label: 'Rounded',
        },
      ],
      selectedIconShape: 'Square',
      iconShapes: [
        {
          id: 1,
          value: 'Square',
          label: 'Square',
        },
        {
          id: 2,
          value: 'Oval',
          label: 'Oval',
        },
        {
          id: 3,
          value: 'Rounded',
          label: 'Rounded',
        },
      ],
      selectedAvatarPosition: 'Middle',
      avatarPositions: [
        {
          id: 1,
          value: 'Top',
          label: 'Top',
        },
        {
          id: 2,
          value: 'Middle',
          label: 'Middle',
        },
        {
          id: 3,
          value: 'Bottom',
          label: 'Bottom',
        },
      ],
      defaultAvatarSize: 100,
      defaultSpacing: 50,
      showBanner: false,
      showHTML: false,
      bannerUrl: '',
      showDisclaimer: false,
      bannerLink: '',
      text:
        'This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.',
      activeName: 'first',
      activeTemplate: 1,
      htmlText: 'Type text here',
    };
  },
  computed: {
    firstName() {
      return this.formFields[0].value;
    },
    lastName() {
      return this.formFields[1].value;
    },
    jobTitle() {
      return this.formFields[2].value;
    },
    companyName() {
      return this.formFields[3].value;
    },
    email() {
      return this.formFields[4].value;
    },
    phoneNumber() {
      return this.formFields[5].value;
    },
    website() {
      return this.formFields[6].value;
    },
    address() {
      return this.formFields[7].value;
    },
    iconShape() {
      return this.selectedIconShape;
    },
    selectedFont() {
      return this.defaultFont;
    },
    fontSize() {
      return this.selectedFontSize;
    },
    avatarShape() {
      return this.selectedAvatarShape;
    },
    addBanner() {
      return this.showBanner;
    },
    addDisclaimer() {
      return this.showDisclaimer;
    },
    addHTML() {
      return this.showHTML;
    },
    disclaimerText() {
      return this.text;
    },
    avatarSizee() {
      return this.defaultAvatarSize * (3 / 2);
    },
    avatarPosition() {
      return this.selectedAvatarPosition;
    },
    contentSpacing() {
      return this.defaultSpacing * (1 / 3);
    },
    linkToBanner() {
      return this.bannerUrl;
    },
  },
  methods: {
    checkField(event) {
      const x = event.target;
      x.classList.add('hasValue');
      if (x.value.length === 0) {
        x.classList.remove('hasValue');
      }
    },
    focusField() {
      this.show = true;
    },
    next() {
      this.active++;
    },
    formatTooltip(val) {
      return `${val * (3 / 2)}px`;
    },
    formatTooltipSpacing(val) {
      return `${val * (1 / 5)}px`;
    },
    handleAvatarSuccess(res, file) {
      const templateRender = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then(data => document
        .querySelector('img.image-avatar')
        .setAttribute('src', `${data}`));
      const formRender = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then(data => document.querySelector('img.avatar').setAttribute('src', `${data}`));
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('Avatar picture must be JPG/PNG format!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
        return false;
      }

      const templateRender = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then((data) => {
        document
          .querySelector('img.image-avatar')
          .setAttribute('src', `${data}`);

        document.querySelector('img.avatar').setAttribute('src', `${data}`);
      });

      return false;
    },
    handleBannerSuccess(res, file) {
      const templateRender = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then(data => document
        .querySelector('img.image-banner')
        .setAttribute('src', `${data}`));
      const formRender = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then(data => document.querySelector('img.banner').setAttribute('src', `${data}`));
    },
    beforeBannerUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('Avatar picture must be JPG/PNG format!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
        return false;
      }

      const templateRender = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then((data) => {
        document
          .querySelector('img.image-banner')
          .setAttribute('src', `${data}`);

        document.querySelector('img.banner').setAttribute('src', `${data}`);
      });

      return false;
    },
    addLink(link) {
      const x = event.target;
      for (let i = 0; i < this.selectedLinks.length; i++) {
        if (this.selectedLinks[i].id === link) {
          this.selectedLinks.splice(i, 1);
          x.closest('div').classList.remove('is-selected');
          return;
        }
      }
      if (this.selectedLinks.length < 6) {
        this.selectedLinks.push({
          id: link,
          label: link.toLowerCase(),
          value: `www.${link.toLowerCase()}.com/`,
        });
        x.closest('div').classList.add('is-selected');
      }
      if (this.selectedLinks.length > 0) {
        this.show = true;
      }
    },
    deleteSocialLink(index) {
      this.selectedLinks.splice(index, 1);
      const x = event.target;
      const icons = document.querySelectorAll('div.social-icon');
      for (let i = 0; i < icons.length; i++) {
        if (
          x.getAttribute('data-match') === icons[i].getAttribute('data-match')
        ) {
          icons[i].classList.remove('is-selected');
        }
      }
    },
    changeLinkColor(val) {
      this.linkColor = val;
    },
    activateTemplate(val) {
      this.activeTemplate = val;
    },
  },
};
</script>
