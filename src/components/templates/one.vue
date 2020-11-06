<template>
  <div>
    <table
      :style="{'font-family': styles.selectedFont, 'font-size': fontSize.title}"
      cellspacing="0"
      cellpadding="0"
      border="1"
      style="table-layout:fixed;border-collapse:collapse;border:1px solid #fff; min-width: 450px;">
      <tbody>
        <tr>
          <td style="padding-bottom: 15px;">
            <table>
              <tbody>
                <tr style="height:100%;">
                  <td :style="{'vertical-align': avatarPosition}">
                    <div
                      :style="{width: avatarHolder}"
                      style="border-right: 1px solid rgba(0,0,0,0.1);">
                      <div
                        :style="{height: avatarSize, width: avatarSize, 'border-radius': avatarShape}"
                        style="background-color: #f0f0f0;">
                        <img
                          :style="{'border-radius': avatarShape}"
                          src=""
                          alt=""
                          class="image-avatar"
                          style="width: 100%;height: 100%;object-fit: cover;background:#fff;"></div>
                    </div>
                  </td>
                  <td
                    v-if="contact.show"
                    :style="{'padding-left':spacing}"
                    style="text-align: left;">
                    <div
                      :style="{'font-size':fontSize.body}"
                      style="margin:0;line-height: 1.3;">
                      <p
                        :style="{'font-size':fontSize.title}"
                        style="margin: 2.7px 0 0;font-weight:bold;color: rgb(0,0,0);"><span
                          class="first_name"
                          style="margin-right: 5px">{{ contact.firstName }}</span><span class="last_name">{{ contact.lastName }}</span></p>
                      <p style="margin: 2.7px 0 10px;color: rgb(0,0,0);"><span style="line-height:normal;font-weight:bold;"><span class="job_title">{{ contact.jobTitle }}</span><span class="company_name">{{ appendSeparator }}</span></span>
                      </p>
                      <p
                        style="margin-bottom:3px;"
                        class="email"><span style="color: rgba(0,0,0,0.8);">{{ prefixEmail }}</span><a
                          :href="`mailto:${contact.email}`"
                          :style="{color:styles.linkColor}"
                          style="text-decoration: none;">{{ contact.email }}</a></p>
                      <p
                        style="margin-bottom:3px;"
                        class="phone_number"><span style="color: rgba(0,0,0,0.8);">{{ prefixPhoneNumber }}</span><a
                          :href="`tel:${contact.phoneNumber}`"
                          :style="{color:styles.linkColor}"
                          style="text-decoration: none;">{{ contact.phoneNumber }}</a></p>
                      <p
                        style="margin-bottom:3px;"
                        class="website"><span style="color: rgba(0,0,0,0.8);">{{ prefixWebsite }}</span><a
                          :href="`https://${contact.website}`"
                          :style="{color:styles.linkColor}"
                          target="_blank"
                          style="text-decoration: none;">{{ contact.website }}</a></p>
                      <p
                        style="margin-bottom:3px;"
                        class="work_address" ><span style="color: rgba(0,0,0,0.8);">{{ prefixAddress }}</span>{{ contact.address }}</p>
                    </div>
                    <div style="margin-bottom: 7px;">
                      <table
                        cellpadding="0"
                        cellspacing="0">
                        <tbody>
                          <tr>
                            <td
                              v-for="select in selectedLinks"
                              :key="select.id"
                              style="padding-top: 5px;padding-right:7px;">
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                align="center">
                                <tbody>
                                  <tr>
                                    <td
                                      :style="{background:styles.linkColor,'border-radius': iconShape}"
                                      align="center"
                                      style="width: 30px; height: 30px;color: #fff;">
                                      <a
                                        :href="`https://${select.value}`"
                                        target="_blank"
                                        style="position: relative;">
                                        <img
                                          :src="`/social-icons/${select.label}.png`"
                                          alt=""
                                          style="max-width: 100%;max-height: 100%;object-fit: contain;padding: 4px;"></a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                  <td
                    v-else
                    :style="{'padding-left': spacing}">
                    <img
                      src="@/assets/img/loader.svg"
                      alt="Signature Preview">
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr
          v-if="addons.addBanner"
          style="background-color:#f0f0f0;">
          <td style="vertical-align:middle;text-align:center;height: 100px; max-width: 450px;">
            <div style="position: relative; height: 100px;width: 100%;">
              <a
                :href="addons.linkToBanner"
                target="_blank"
                style="display: block;height: 100%;width:100%;">
                <img
                  src=""
                  alt=""
                  class="image-banner"
                  style="width: 100%;height: 100%;object-fit: cover;">
              </a>
            </div>
          </td>
        </tr>
        <tr
          v-if="addons.addHTML"
          style="background: #f0f0f0;">
          <td style="vertical-align:middle;text-align:left;height: auto; max-width: 450px;padding: 10px;">
            <div style="position: relative; height: 100px;width: 100%;">
              <p>{{ addons.htmlText }}</p>
            </div>
          </td>
        </tr>
        <tr
          v-if="addons.addDisclaimer"
          :style="{'font-size':fontSize.dis}"
          style="height: auto;background-color:#fff;">
          <td style="color: rgba(0,0,0,0.5);vertical-align:middle;text-align: justify">
            <div style="margin-top:15px;">
              <p>{{ addons.disclaimerText }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'One',
  componentName: 'TemplateOne',
  props: {
    contact: {
      type: Object,
      default() {
        return [];
      },
    },
    selectedLinks: {
      type: Array,
      default() {
        return [];
      },
    },
    styles: {
      type: Object,
      default() {
        return [];
      },
    },
    addons: {
      type: Object,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      emptyVariable: '',
      prefix: '',
    };
  },
  computed: {
    iconShape() {
      if (this.styles.iconShape === 'Square') {
        return '0px';
      } if (this.styles.iconShape === 'Rounded') {
        return '4px';
      } if (this.styles.iconShape === 'Oval') {
        return '50px';
      }
    },
    avatarShape() {
      if (this.styles.avatarShape === 'Square') {
        return '0px';
      } if (this.styles.avatarShape === 'Rounded') {
        return '7px';
      } if (this.styles.avatarShape === 'Oval') {
        return '100%';
      }
    },
    avatarPosition() {
      if (this.styles.avatarPosition === 'Top') {
        return 'top';
      } if (this.styles.avatarPosition === 'Middle') {
        return 'middle';
      } if (this.styles.avatarPosition === 'Bottom') {
        return 'bottom';
      }
    },
    fontSize() {
      if (this.styles.fontSize === 'Small') {
        return { title: '12px', body: '10px', dis: '8px' };
      } if (this.styles.fontSize === 'Medium') {
        return { title: '14px', body: '12px', dis: '10px' };
      } if (this.styles.fontSize === 'Large') {
        return { title: '16px', body: '14px', dis: '12px' };
      }
    },
    avatarSize() {
      return `${this.styles.avatarSizee}px`;
    },
    spacing() {
      return `${this.styles.contentSpacing}px`;
    },
    avatarHolder() {
      return `${this.styles.avatarSizee + this.styles.contentSpacing}px`;
    },
    appendSeparator() {
      if (this.contact.companyName.length > 0) {
        return ` - ${this.contact.companyName}`;
      }
      return '';
    },
    prefixEmail() {
      if (this.contact.email.length > 0) {
        return 'Email: ';
      }
    },
    prefixPhoneNumber() {
      if (this.contact.phoneNumber.length > 0) {
        return 'Phone(s): ';
      }
    },
    prefixWebsite() {
      if (this.contact.website.length > 0) {
        return 'Website: ';
      }
    },
    prefixAddress() {
      if (this.contact.address.length > 0) {
        return 'Address: ';
      }
    },
  },
  methods: {},
};
</script>
