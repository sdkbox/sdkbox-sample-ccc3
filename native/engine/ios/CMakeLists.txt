cmake_minimum_required(VERSION 3.8)
set(CMAKE_SYSTEM_NAME iOS)
set(APP_NAME "SDKBoxSample"  CACHE STRING "Project Name")
project(${APP_NAME} CXX)

include(${CMAKE_CURRENT_LIST_DIR}/../common/CMakeLists.txt)
include(${CMAKE_CURRENT_LIST_DIR}/../common/sdkboxUtils.cmake)

set(LIB_NAME ${APP_NAME}-mobile)

set(UI_RESOURCES)
set(PROJ_SOURCES)
set(PROJ_COMMON_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/Game.h
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/Game.cpp
)

if(NOT EXISTS ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/jsb_module_register.cpp)
    file(COPY "${COCOS_X_PATH}/cocos/bindings/manual/jsb_module_register.cpp"
        DESTINATION ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/)
endif()
# source-IAP
list(APPEND PROJ_COMMON_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/PluginIAPJS.cpp
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/PluginIAPJSHelper.cpp
)
# source-sdkbox
list(APPEND PROJ_COMMON_SOURCES ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/SDKBoxJSHelper.cpp)
list(APPEND PROJ_COMMON_SOURCES ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/jsb_module_register.cpp)

set(UI_RESOURCES
    ${CMAKE_CURRENT_LIST_DIR}/LaunchScreenBackground.png
    ${CMAKE_CURRENT_LIST_DIR}/Images.xcassets
    ${CMAKE_CURRENT_LIST_DIR}/Base.lproj/Localizable.strings
    ${CMAKE_CURRENT_LIST_DIR}/Base.lproj/LaunchScreen.storyboard
)


# -------------- SRART ---------------
# USED BY COCOS SERVICE, DON'T REMOVE!
if(EXISTS ${RES_DIR}/proj/service.cmake)
    set(SERVICE_NATIVE_DIR ${CMAKE_CURRENT_LIST_DIR})
    include(${RES_DIR}/proj/service.cmake)
endif()
# --------------  END ----------------

list(APPEND PROJ_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/AppDelegate.mm
    ${CMAKE_CURRENT_LIST_DIR}/AppDelegate.h
    ${CMAKE_CURRENT_LIST_DIR}/service/SDKWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/service/SDKWrapper.h
    ${CMAKE_CURRENT_LIST_DIR}/main.m
    ${CMAKE_CURRENT_LIST_DIR}/ViewController.mm
    ${CMAKE_CURRENT_LIST_DIR}/ViewController.h
    ${UI_RESOURCES}
)

# sdkbox-config
file(COPY "${CMAKE_CURRENT_LIST_DIR}/../common/assets/sdkbox_config.json" DESTINATION ${RES_DIR}/assets/)
include_resources(${RES_DIR}/assets)

add_executable(${LIB_NAME} ${PROJ_SOURCES} ${ASSET_FILES} ${PROJ_COMMON_SOURCES})
source_group(TREE ${RES_DIR}/assets PREFIX "Resources" FILES ${ASSET_FILES})
source_group(TREE ${CMAKE_CURRENT_LIST_DIR} PREFIX "Source Files" FILES ${PROJ_SOURCES})
source_group(TREE ${CMAKE_CURRENT_LIST_DIR}/../common PREFIX "Source Files" FILES ${PROJ_COMMON_SOURCES})


# -------------- SRART ---------------
# USED BY COCOS SERVICE, DON'T REMOVE!
if(COMMAND service_insert_library)
    service_insert_library()
endif()
# --------------  END ----------------

target_link_libraries(${LIB_NAME} cocos2d)
target_include_directories(${LIB_NAME} PRIVATE
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes
    ${CMAKE_CURRENT_LIST_DIR}/service
)

set(EXECUTABLE_NAME ${LIB_NAME}) # referenced in Info.plist
set(PRODUCT_NAME ${APP_NAME})

# link-flag-sdkbox
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -framework sdkbox")
# link-flag-PluginIAP
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -framework PluginIAP")
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -framework Security")
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -framework StoreKit")
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -framework SystemConfiguration")
set_target_properties(${LIB_NAME} PROPERTIES 
    MACOSX_BUNDLE_INFO_PLIST "${CMAKE_CURRENT_LIST_DIR}/Info.plist"
    MACOSX_BUNDLE 1
    RESOURCE "${UI_RESOURCES}"
    OSX_ARCHITECTURES "arm64;x86_64"
    MACOSX_DEPLOYMENT_TARGET ${TARGET_IOS_VERSION}
    XCODE_ATTRIBUTE_DEVELOPMENT_TEAM "${DEVELOPMENT_TEAM}"
    XCODE_ATTRIBUTE_CODE_SIGN_IDENTITY "iPhone Developer"
    XCODE_ATTRIBUTE_ASSETCATALOG_COMPILER_APPICON_NAME "AppIcon"
    XCODE_ATTRIBUTE_ASSETCATALOG_COMPILER_LAUNCHSTORYBOARD_NAME "LaunchScreen"
    XCODE_ATTRIBUTE_IPHONEOS_DEPLOYMENT_TARGET ${TARGET_IOS_VERSION}
    XCODE_ATTRIBUTE_ENABLE_BITCODE NO
    XCODE_ATTRIBUTE_ONLY_ACTIVE_ARCH YES
    XCODE_ATTRIBUTE_FRAMEWORK_SEARCH_PATHS "\"${CMAKE_CURRENT_LIST_DIR}\""
    IOS_INSTALL_COMBINED YES
    XCODE_ATTRIBUTE_SKIP_INSTALL NO
    XCODE_ATTRIBUTE_INSTALL_PATH "$(LOCAL_APPS_DIR)"
)