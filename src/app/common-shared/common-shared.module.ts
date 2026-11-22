import { NgModule } from '@angular/core';
import { CommonModule, formatPercent } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { PanelModule } from 'primeng/panel';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileUploadModule } from 'primeng/fileupload';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { TreeTableModule } from 'primeng/treetable';
import { DynamicDialogModule } from 'primeng/dynamicdialog'; 
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { PasswordModule } from 'primeng/password';
import { ChartModule } from 'primeng/chart';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip'; 
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SplitterModule } from 'primeng/splitter';
import { EditorModule } from 'primeng/editor'
import { RatingModule } from 'primeng/rating'
import { TimelineModule } from 'primeng/timeline' 
 
@NgModule({
  declarations: [
   
    // SideNavComponent
  ],
  imports: [ListboxModule,
    CommonModule,  
    TimelineModule,
    FormsModule, 
    ButtonModule,
    InputTextModule,
    KeyFilterModule,
    InputNumberModule,
    DropdownModule,
    TableModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    SelectButtonModule,
    RatingModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    RadioButtonModule,
    TabViewModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    CheckboxModule,
    CardModule,
    InputMaskModule,
    PanelModule,
    BlockUIModule,
    ProgressSpinnerModule,
    FileUploadModule,
    SidebarModule,
    AutoCompleteModule,
    TreeModule,
    // OrderListModule,
    ImageModule,
    DividerModule,
    TreeTableModule,
    DynamicDialogModule, 
    //DialogService,
    OverlayPanelModule,
    ConfirmDialogModule,
    CarouselModule,
    PasswordModule,
    ChartModule,
    AccordionModule,
    TagModule,
    TooltipModule, 
    AvatarModule,
    BadgeModule,
    ChipModule, 
    BreadcrumbModule,
    SplitterModule,
    EditorModule
  ],
  exports: [ListboxModule,  
     TimelineModule,
    
    FormsModule, 
    ButtonModule,
    InputTextModule,
    KeyFilterModule,
    InputNumberModule,
    DropdownModule,
    TableModule,
    RatingModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    SelectButtonModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    RadioButtonModule,
    TabViewModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    CheckboxModule,
    CardModule,
    InputMaskModule,
    PanelModule,
    BlockUIModule,
    ProgressSpinnerModule,
    FileUploadModule,
    SidebarModule,
    AutoCompleteModule,
    TreeModule,
    ImageModule,
    DividerModule,
    TreeTableModule,
    DynamicDialogModule, 
    // DialogService,
    // OrderListModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    CarouselModule,
    PasswordModule,
    ChartModule,
    AccordionModule,
    TagModule,
    TooltipModule, 
    AvatarModule,
    BadgeModule, 
    ChipModule,  
    BreadcrumbModule,
    SplitterModule,
    EditorModule
    // SideNavComponent

  ],
  providers: [ConfirmationService, MessageService]
})
export class CommonSharedModule { }
